import { InventoryEndpointTypes } from "@al-un/recitry-core/inventory/inventory.endpoints";
import { InventoryRoutes } from "@al-un/recitry-core/inventory/inventory.routes";

import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import PaginationCheckMiddleware from "@/core/middlewares/PaginationCheckMiddleware";
import { isAuthenticated } from "@/um/Auth.middleware";
import * as InventoryController from "./Inventory.controller";
import * as InventoryContainerController from "./InventoryContainer.controller";
import * as InventoryItemController from "./InventoryItem.controller";
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
    middlewares: [isAuthenticated],
  },
  inventoryList: {
    route: InventoryRoutes["inventoryList"],
    controller: InventoryController.listInventories,
    middlewares: [isAuthenticated, PaginationCheckMiddleware(100)],
  },
  inventoryDisplay: {
    route: InventoryRoutes["inventoryDisplay"],
    controller: InventoryController.displayInventory,
    middlewares: [isAuthenticated],
  },
  inventoryUpdate: {
    route: InventoryRoutes["inventoryUpdate"],
    controller: InventoryController.updateInventory,
    middlewares: [isAuthenticated, checkInventoryAuthor],
  },
  inventoryDelete: {
    route: InventoryRoutes["inventoryDelete"],
    controller: InventoryController.deleteInventory,
    middlewares: [isAuthenticated, checkInventoryAuthor],
  },
  inventoryContainerCreate: {
    route: InventoryRoutes["inventoryContainerCreate"],
    controller: InventoryContainerController.createInventoryContainer,
    middlewares: [isAuthenticated, checkInventoryAuthor],
  },
  inventoryContainerUpdate: {
    route: InventoryRoutes["inventoryContainerUpdate"],
    controller: InventoryContainerController.updateInventoryContainer,
    middlewares: [
      isAuthenticated,
      checkInventoryAuthor,
      checkInventoryContainerAuthor,
    ],
  },
  inventoryContainerDelete: {
    route: InventoryRoutes["inventoryContainerDelete"],
    controller: InventoryContainerController.deleteInventoryContainer,
    middlewares: [
      isAuthenticated,
      checkInventoryAuthor,
      checkInventoryContainerAuthor,
    ],
  },
  inventoryItemCreate: {
    route: InventoryRoutes["inventoryItemCreate"],
    controller: InventoryItemController.createInventoryItem,
    middlewares: [isAuthenticated, checkInventoryAuthor],
  },
  inventoryItemUpdate: {
    route: InventoryRoutes["inventoryItemUpdate"],
    controller: InventoryItemController.updateInventoryItem,
    middlewares: [
      isAuthenticated,
      checkInventoryAuthor,
      checkInventoryItemAuthor,
    ],
  },
  inventoryItemDelete: {
    route: InventoryRoutes["inventoryItemDelete"],
    controller: InventoryItemController.deleteInventoryItem,
    middlewares: [
      isAuthenticated,
      checkInventoryAuthor,
      checkInventoryItemAuthor,
    ],
  },
};

const InventoryRouter = loadRouterConfig(InventoryRouterConfig);

// ----------------------------------------------------------------------------

export default InventoryRouter;
