// import Express from "express";

import * as AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import {
  AuthEndpointTypes,
  AuthRoutes,
} from "@al-un/ressaite-core/um/api/Auth";

// const AuthRouter = Express.Router();

// ----------------------------------------------------------------------------

const AuthRouterConfig: ExpressRouterConfig<AuthEndpointTypes> = {
  login: {
    route: AuthRoutes["login"],
    controller: AuthController.login,
  },
  logout: {
    route: AuthRoutes["logout"],
    controller: AuthController.logout,
    middlewares: [AuthMiddleware],
  },
  signup: {
    route: AuthRoutes["signup"],
    controller: AuthController.signUp,
  },
};

const AuthRouter = loadRouterConfig(AuthRouterConfig);

// AuthRouter.post("/v1/login", AuthController.login);

// AuthRouter.post("/v1/signup", AuthController.signUp);

// AuthRouter.post("/v1/logout", AuthMiddleware, AuthController.logout);

// ----------------------------------------------------------------------------

export default AuthRouter;
