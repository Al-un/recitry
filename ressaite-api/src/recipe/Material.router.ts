import { MaterialEndpointTypes } from "@al-un/ressaite-core/recipe/material.endpoints";
import { MaterialRoutes } from "@al-un/ressaite-core/recipe/material.routes";

import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import AuthMiddleware from "@/um/middlewares/AuthMiddleware";
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
    middlewares: [AuthMiddleware],
  },
  materialUpdate: {
    route: MaterialRoutes["materialUpdate"],
    controller: MaterialController.updateMaterial,
    middlewares: [AuthMiddleware],
  },
  materialDelete: {
    route: MaterialRoutes["materialDelete"],
    controller: MaterialController.deleteMaterial,
    middlewares: [AuthMiddleware],
  },
};

const MaterialRouter = loadRouterConfig(MaterialRouterConfig);

// ----------------------------------------------------------------------------

export default MaterialRouter;
