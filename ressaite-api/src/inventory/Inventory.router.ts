import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import { InventoryRoutes } from "@al-un/ressaite-core/inventory/inventory.routes";

import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import AuthMiddleware from "@/um/middlewares/AuthMiddleware";
import * as InventoryController from "./Inventory.controller";

// ----------------------------------------------------------------------------

const InventoryRouterConfig: ExpressRouterConfig<InventoryEndpointTypes> = {
  inventoryCreate: {
    route: InventoryRoutes["inventoryCreate"],
    controller: InventoryController.createInventory,
    middlewares: [AuthMiddleware],
  },
  inventoryList: {
    route: InventoryRoutes["inventoryList"],
    controller: InventoryController.listInventories,
    middlewares: [AuthMiddleware],
  },
  inventoryDisplay: {
    route: InventoryRoutes["inventoryDisplay"],
    controller: InventoryController.displayInventory,
    middlewares: [AuthMiddleware],
  },
  inventoryUpdate: {
    route: InventoryRoutes["inventoryUpdate"],
    controller: InventoryController.updateInventory,
    middlewares: [AuthMiddleware],
  },
  inventoryDelete: {
    route: InventoryRoutes["inventoryDelete"],
    controller: InventoryController.deleteInventory,
    middlewares: [AuthMiddleware],
  },
  inventoryContainerCreate: {
    route: InventoryRoutes["inventoryContainerCreate"],
    controller: InventoryController.createInventoryContainer,
    middlewares: [AuthMiddleware],
  },
  inventoryContainerUpdate: {
    route: InventoryRoutes["inventoryContainerUpdate"],
    controller: InventoryController.updateInventoryContainer,
    middlewares: [AuthMiddleware],
  },
  inventoryContainerDelete: {
    route: InventoryRoutes["inventoryContainerDelete"],
    controller: InventoryController.deleteInventoryContainer,
    middlewares: [AuthMiddleware],
  },
  inventoryItemCreate: {
    route: InventoryRoutes["inventoryItemCreate"],
    controller: InventoryController.createInventoryItem,
    middlewares: [AuthMiddleware],
  },
  inventoryItemUpdate: {
    route: InventoryRoutes["inventoryItemUpdate"],
    controller: InventoryController.updateInventoryItem,
    middlewares: [AuthMiddleware],
  },
  inventoryItemDelete: {
    route: InventoryRoutes["inventoryItemDelete"],
    controller: InventoryController.deleteInventoryItem,
    middlewares: [AuthMiddleware],
  },
};

const InventoryRouter = loadRouterConfig(InventoryRouterConfig);

// ----------------------------------------------------------------------------

export default InventoryRouter;
