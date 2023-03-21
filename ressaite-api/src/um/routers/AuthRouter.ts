import Express from "express";

import * as AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const AuthRouter = Express.Router();

// ----------------------------------------------------------------------------

AuthRouter.post("/v1/login", AuthController.login);

AuthRouter.post("/v1/signup", AuthController.signUp);

AuthRouter.post("/v1/logout", AuthMiddleware, AuthController.logout);

// ----------------------------------------------------------------------------

export default AuthRouter;
