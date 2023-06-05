import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import { InventoryRoutes } from "@al-un/ressaite-core/inventory/inventory.routes";

import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import AuthMiddleware from "@/um/middlewares/AuthMiddleware";
import * as InventoryController from "./Inventory.controller";
import {
  checkInventoryAuthor,
  checkInventoryContainerAuthor,
  checkInventoryItemAuthor,
} from "./Inventory.middleware";

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
    middlewares: [AuthMiddleware, checkInventoryAuthor],
  },
  inventoryDelete: {
    route: InventoryRoutes["inventoryDelete"],
    controller: InventoryController.deleteInventory,
    middlewares: [AuthMiddleware, checkInventoryAuthor],
  },
  inventoryContainerCreate: {
    route: InventoryRoutes["inventoryContainerCreate"],
    controller: InventoryController.createInventoryContainer,
    middlewares: [AuthMiddleware, checkInventoryAuthor],
  },
  inventoryContainerUpdate: {
    route: InventoryRoutes["inventoryContainerUpdate"],
    controller: InventoryController.updateInventoryContainer,
    middlewares: [
      AuthMiddleware,
      checkInventoryAuthor,
      checkInventoryContainerAuthor,
    ],
  },
  inventoryContainerDelete: {
    route: InventoryRoutes["inventoryContainerDelete"],
    controller: InventoryController.deleteInventoryContainer,
    middlewares: [
      AuthMiddleware,
      checkInventoryAuthor,
      checkInventoryContainerAuthor,
    ],
  },
  inventoryItemCreate: {
    route: InventoryRoutes["inventoryItemCreate"],
    controller: InventoryController.createInventoryItem,
    middlewares: [AuthMiddleware, checkInventoryAuthor],
  },
  inventoryItemUpdate: {
    route: InventoryRoutes["inventoryItemUpdate"],
    controller: InventoryController.updateInventoryItem,
    middlewares: [
      AuthMiddleware,
      checkInventoryAuthor,
      checkInventoryItemAuthor,
    ],
  },
  inventoryItemDelete: {
    route: InventoryRoutes["inventoryItemDelete"],
    controller: InventoryController.deleteInventoryItem,
    middlewares: [
      AuthMiddleware,
      checkInventoryAuthor,
      checkInventoryItemAuthor,
    ],
  },
};

const InventoryRouter = loadRouterConfig(InventoryRouterConfig);

// ----------------------------------------------------------------------------

export default InventoryRouter;
