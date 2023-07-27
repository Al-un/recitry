import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";

import { AuthEndpointTypes } from "@al-un/ressaite-core/um/auth.endpoints";
import { AccessTokenModel } from "./AccessToken.model";
import { hashPassword, UserModel } from "./User.model";
import { ExpressController } from "@/core/express";
import { SessionInfo } from "@al-un/ressaite-core/um/users.models";

// ----------------------------------------------------------------------------

type AuthControllerTypes = ExpressController<AuthEndpointTypes>;

// ----------------------------------------------------------------------------

const localVerify: VerifyFunction = async (email, password, cb) => {
  let user: UserModel | null;
  try {
    user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return cb(null, false, { message: "Incorrect email or password" });
    }
  } catch (err) {
    return cb(err, false, { message: `An error happened: ${err}` });
  }

  const salt = user.salt;
  const hashedPassword = hashPassword(password, salt);
  if (hashedPassword !== user.password) {
    return cb(null, false, { message: "Incorrect email or password" });
  }

  let newAccessToken = new AccessTokenModel();
  newAccessToken.init(user);

  try {
    newAccessToken = await newAccessToken.save();
    return cb(null, { id: user.id, token: newAccessToken.token });
  } catch (err) {
    return cb(err, false, { message: `An error happened: ${err}` });
  }
};

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    localVerify
  )
);

// ----------------------------------------------------------------------------

export const login: AuthControllerTypes["login"] = (req, res, next) => {
  // console.log(`${req.res?.locals.requestId}: Logging with`, req.body);

  type LocalCallback = Parameters<VerifyFunction>[2];
  const callbackHandler: LocalCallback = (err, authInfo, info) => {
    if (err) {
      return next(err);
    }
    if (!authInfo) {
      return res.status(400).json({ message: info?.message });
    }

    res
      .setHeader("Set-Cookie", `token=${authInfo.token}`)
      .json({ token: authInfo.token });
  };

  // https://stackoverflow.com/a/32002327/4906586
  const passportAugment = passport.authenticate(
    "local",
    { session: false },
    callbackHandler
  );
  passportAugment(req, res, next);
};

/**
 * Handle the logout flow by expiring the valid token.
 *
 * Also, returning 401 based on StackOverflow below.
 *
 * @see https://stackoverflow.com/a/6937030/4906586
 */
export const logout: AuthControllerTypes["logout"] = async (req, res) => {
  const token = req?.user?.token;
  if (!token) {
    throw new Error("No access token provided!");
  }

  let accessToken = await AccessTokenModel.findOne({ where: { token } });
  if (!accessToken) {
    throw new Error("Token not found");
  }

  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  accessToken.set("expiresAt", yesterday);

  accessToken = await accessToken.save();

  res.sendStatus(204);
};

export const sessionInfo: AuthControllerTypes["sessionInfo"] = async (
  req,
  res,
  next
) => {
  const token = req?.user?.token;
  if (!token) {
    throw new Error("No access token provided!");
  }

  let user = await UserModel.findOne({
    include: [
      {
        model: AccessTokenModel,
        required: true,
        where: { token },
      },
    ],
  });
  if (!user) {
    throw new Error(`No user found for token`);
  }

  const sessionInfo: SessionInfo = {
    user: user.toMinimalProfile,
  };

  res.status(200).json(sessionInfo);
};

export const signUp: AuthControllerTypes["signup"] = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: "Email already taken" });
    return;
  }

  let newUser = new UserModel({
    email,
    password,
  });

  try {
    await newUser.save();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};
