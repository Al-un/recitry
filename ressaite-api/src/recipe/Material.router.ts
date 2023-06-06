import { MaterialEndpointTypes } from "@al-un/ressaite-core/recipe/material.endpoints";
import { MaterialRoutes } from "@al-un/ressaite-core/recipe/material.routes";

import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import { isAuthenticated } from "@/um/Auth.middleware";
import * as MaterialController from "./Material.controller";

// ----------------------------------------------------------------------------

const MaterialRouterConfig: ExpressRouterConfig<MaterialEndpointTypes> = {
  materialSearch: {
    route: MaterialRoutes["materialSearch"],
    controller: MaterialController.searchMaterial,
  },
  materialCreate: {
    route: MaterialRoutes["materialCreate"],
    controller: MaterialController.createMaterial,
    middlewares: [isAuthenticated],
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
