import { MiscEndpointTypes } from "@al-un/recitry-core/core/misc.endpoints";
import { MiscRoutes } from "@al-un/recitry-core/core/misc.routes";
import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import * as MiscController from "../controllers/MiscController";

// ----------------------------------------------------------------------------

const MiscRouterConfig: ExpressRouterConfig<MiscEndpointTypes> = {
  health: {
    route: MiscRoutes["health"],
    controller: MiscController.healthCheck,
  },
};

const MiscRouter = loadRouterConfig(MiscRouterConfig);

// ----------------------------------------------------------------------------

export default MiscRouter;
