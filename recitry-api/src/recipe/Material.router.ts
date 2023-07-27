import { MaterialEndpointTypes } from "@al-un/ressaite-core/recipe/material.endpoints";
import { MaterialRoutes } from "@al-un/ressaite-core/recipe/material.routes";

import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import PaginationCheckMiddleware from "@/core/middlewares/PaginationCheckMiddleware";
import { isAuthenticated } from "@/um/Auth.middleware";
import * as MaterialController from "./Material.controller";

// ----------------------------------------------------------------------------

const MaterialRouterConfig: ExpressRouterConfig<MaterialEndpointTypes> = {
  materialSearch: {
    route: MaterialRoutes["materialSearch"],
    controller: MaterialController.searchMaterial,
    middlewares: [PaginationCheckMiddleware(50)],
  },
  materialCreate: {
    route: MaterialRoutes["materialCreate"],
    controller: MaterialController.createMaterial,
    middlewares: [isAuthenticated],
  },
  materialDisplay: {
    route: MaterialRoutes["materialDisplay"],
    controller: MaterialController.displayMaterial,
  },
  materialUpdate: {
    route: MaterialRoutes["materialUpdate"],
    controller: MaterialController.updateMaterial,
    middlewares: [isAuthenticated],
  },
  materialDelete: {
    route: MaterialRoutes["materialDelete"],
    controller: MaterialController.deleteMaterial,
    middlewares: [isAuthenticated],
  },
};

const MaterialRouter = loadRouterConfig(MaterialRouterConfig);

// ----------------------------------------------------------------------------

export default MaterialRouter;
