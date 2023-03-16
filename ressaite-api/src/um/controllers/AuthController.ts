import { RequestHandler } from "express";
import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";

import { RstErrorResp } from "@al-un/ressaite-core/core/models/api";
import { SignUpReq, SignUpResp } from "@al-un/ressaite-core/um/models/Auth";
import { AccessToken } from "../models/AccessToken";
import { hashPassword, User } from "../models/User";

// ----------------------------------------------------------------------------

const localVerify: VerifyFunction = async (username, password, cb) => {
  let user: User | null;
  try {
    user = await User.findOne({ where: { username } });
    if (!user) {
      return cb(null, false, { message: "Incorrect username or password" });
    }
  } catch (err) {
    return cb(err, false, { message: `An error happened: ${err}` });
  }

  const salt = user.salt;
  const hashedPassword = hashPassword(password, salt);
  if (hashedPassword !== user.password) {
    return cb(null, false, { message: "Incorrect username or password" });
  }

  let newAccessToken = new AccessToken();
  newAccessToken.init(user);

  try {
    newAccessToken = await newAccessToken.save();
    return cb(null, { id: user.id, token: newAccessToken.token });
  } catch (err) {
    return cb(err, false, { message: `An error happened: ${err}` });
  }
};

passport.use(new LocalStrategy(localVerify));

// ----------------------------------------------------------------------------

export const login: RequestHandler = (req, res, next) => {
  type LocalCallback = Parameters<VerifyFunction>[2];
  const callbackHandler: LocalCallback = (err, authInfo, info) => {
    if (err) {
      return next(err);
    }
    if (!authInfo) {
      const error: RstErrorResp = {
        message: info?.message,
      };
      return res.status(400).json(error);
    }

    res.json({ token: authInfo.token });
  };

  // https://stackoverflow.com/a/32002327/4906586
  const passportAugment = passport.authenticate(
    "local",
    { session: false },
    callbackHandler
  );
  passportAugment(req, res, next);
};

export const logout: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const token = req.user.token;

  const accessToken = await AccessToken.findOne({ where: { token } });
  if (!accessToken) {
    throw new Error();
  }
  console.log("FOUND", accessToken);
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  accessToken.set("expiresAt", yesterday);

  await accessToken.save();

  res.status(200);
};

export const signUp: RequestHandler<undefined, SignUpResp, SignUpReq> = async (
  req,
  res,
  next
) => {
  const { username, password } = req.body;
  let newUser = new User({
    username,
    password,
  });

  try {
    await newUser.save();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};
