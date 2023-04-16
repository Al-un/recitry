import {
  MiscEndpointTypes,
  MiscRoutes,
} from "@al-un/ressaite-core/core/api/misc";
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
