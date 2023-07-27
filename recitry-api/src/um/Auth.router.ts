import { AuthEndpointTypes } from "@al-un/recitry-core/um/auth.endpoints";
import { AuthRoutes } from "@al-un/recitry-core/um/auth.routes";
import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import * as AuthController from "./Auth.controller";
import * as AuthMiddleware from "./Auth.middleware";

// ----------------------------------------------------------------------------

const AuthRouterConfig: ExpressRouterConfig<AuthEndpointTypes> = {
  login: {
    route: AuthRoutes["login"],
    controller: AuthController.login,
  },
  logout: {
    route: AuthRoutes["logout"],
    controller: AuthController.logout,
    middlewares: [AuthMiddleware.isAuthenticated],
  },
  sessionInfo: {
    route: AuthRoutes["sessionInfo"],
    controller: AuthController.sessionInfo,
    middlewares: [AuthMiddleware.isAuthenticated],
  },
  signup: {
    route: AuthRoutes["signup"],
    controller: AuthController.signUp,
  },
};

const AuthRouter = loadRouterConfig(AuthRouterConfig);

// ----------------------------------------------------------------------------

export default AuthRouter;
