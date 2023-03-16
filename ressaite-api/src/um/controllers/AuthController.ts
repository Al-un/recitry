import { RequestHandler } from "express";
import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";

import { RstErrorResp } from "@al-un/ressaite-core/core/models/api";
import {
  LoginReq,
  LoginResp,
  SignUpReq,
  SignUpResp,
} from "@al-un/ressaite-core/um/models/Auth";
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
type LoginHandler = RequestHandler<undefined, LoginResp, LoginReq>;

export const login: LoginHandler = (req, res, next) => {
  type LocalCallback = Parameters<VerifyFunction>[2];
  const callbackHandler: LocalCallback = (err, authInfo, info) => {
    if (err) {
      return next(err);
    }
    if (!authInfo) {
      return res.status(400).json({ message: info?.message });
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

type LogoutHandler = RequestHandler<undefined, null, null>;

export const logout: LogoutHandler = async (req, res) => {
  const token = req?.user?.token;
  if (!token) {
    throw new Error("No access token provided!");
  }

  const accessToken = await AccessToken.findOne({ where: { token } });
  if (!accessToken) {
    throw new Error("Token not found");
  }

  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  accessToken.set("expiresAt", yesterday);

  await accessToken.save();

  res.status(200);
};

type SignUpHandler = RequestHandler<undefined, SignUpResp, SignUpReq>;

export const signUp: SignUpHandler = async (req, res, next) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    res.status(400).json({ message: "Username already taken" });
    return;
  }

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
