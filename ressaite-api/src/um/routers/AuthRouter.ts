import {
  AuthEndpointTypes,
  AuthRoutes,
} from "@al-un/ressaite-core/um/auth.endpoints";
import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import * as AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

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

// ----------------------------------------------------------------------------

export default AuthRouter;
