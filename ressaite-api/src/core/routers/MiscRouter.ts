import Express from "express";

import * as MiscController from "../controllers/MiscController";

const MiscRouter = Express.Router();

// ----------------------------------------------------------------------------

MiscRouter.get("/v1/health", MiscController.healthCheck);

// ----------------------------------------------------------------------------

export default MiscRouter;
