import { RequestHandler } from "express";
import passport from "passport";
import {
  Strategy as BearerStrategy,
  VerifyFunction,
} from "passport-http-bearer";

import { RstErrorResp } from "@al-un/ressaite-core/core/models/api";
import { AccessToken } from "../models/AccessToken";

// ----------------------------------------------------------------------------

const bearerVerify: VerifyFunction = async function verify(token, cb) {
  try {
    const validToken = await AccessToken.findOne({ where: { token } });
    if (!validToken) {
      return cb(null, false, { scope: "all", message: "token not fond" });
    }

    if (validToken.expiresAt < new Date()) {
      return cb(null, false, { scope: "all", message: "expired token" });
    }

    const user = validToken.user;

    return cb(null, { token, user });
  } catch (error) {
    return cb(error, false);
  }
};

passport.use(new BearerStrategy(bearerVerify));

const AuthMiddleware: RequestHandler = (req, res, next) => {
  type BearerCallback = Parameters<VerifyFunction>[1];
  const cbHandler: BearerCallback = (err, authInfo, opts) => {
    if (err) {
      return next(err);
    }
    if (!authInfo) {
      const error: RstErrorResp = {
        message: typeof opts === "string" ? opts : opts?.message,
      };
      return res.status(401).json(error);
    }

    req.user = {
      id: authInfo.user.id,
      token: authInfo.token,
    };

    next();
  };

  const bearerAugment = passport.authenticate(
    "bearer",
    { session: false },
    cbHandler
  );
  bearerAugment(req, res, next);
};

// ----------------------------------------------------------------------------

export default AuthMiddleware;
