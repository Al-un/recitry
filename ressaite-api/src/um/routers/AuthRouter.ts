import Express from "express";

import * as AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const AuthRouter = Express.Router();

// ----------------------------------------------------------------------------

AuthRouter.post("/login", AuthController.login);

AuthRouter.post("/signup", AuthController.signUp);

AuthRouter.post("/logout", AuthMiddleware, AuthController.logout);

// ----------------------------------------------------------------------------

export default AuthRouter;
