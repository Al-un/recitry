import { AuthEndpointTypes } from "@al-un/ressaite-core/um/auth.endpoints";
import { AuthRoutes } from "@al-un/ressaite-core/um/auth.routes";
import { ExpressRouterConfig, loadRouterConfig } from "@/core/express";
import * as InventoryController from "./Inventory.controller";
import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import { InventoryRoutes } from "@al-un/ressaite-core/inventory/inventory.routes";

// ----------------------------------------------------------------------------

const InventoryRouterConfig: ExpressRouterConfig<InventoryEndpointTypes> = {
  inventoryCreate: {
    route: InventoryRoutes["inventoryCreate"],
    controller: InventoryController.createInventory,
  },
  inventoryList: {
    route: InventoryRoutes["inventoryList"],
    controller: InventoryController.listInventories,
  },
  inventoryDisplay: {
    route: InventoryRoutes["inventoryDisplay"],
    controller: InventoryController.displayInventory,
  },
  inventoryUpdate: {
    route: InventoryRoutes["inventoryUpdate"],
    controller: InventoryController.updateInventory,
  },
  inventoryDelete: {
    route: InventoryRoutes["inventoryDelete"],
    controller: InventoryController.deleteInventory,
  },
  inventoryContainerCreate: {
    route: InventoryRoutes["inventoryContainerCreate"],
    controller: InventoryController.createInventoryContainer,
  },
  inventoryContainerUpdate: {
    route: InventoryRoutes["inventoryContainerUpdate"],
    controller: InventoryController.updateInventoryContainer,
  },
  inventoryContainerDelete: {
    route: InventoryRoutes["inventoryContainerDelete"],
    controller: InventoryController.deleteInventoryContainer,
  },
  inventoryItemCreate: {
    route: InventoryRoutes["inventoryItemCreate"],
    controller: InventoryController.createInventoryItem,
  },
  inventoryItemUpdate: {
    route: InventoryRoutes["inventoryItemUpdate"],
    controller: InventoryController.updateInventoryItem,
  },
  inventoryItemDelete: {
    route: InventoryRoutes["inventoryItemDelete"],
    controller: InventoryController.deleteInventoryItem,
  },
};

const InventoryRouter = loadRouterConfig(InventoryRouterConfig);

// ----------------------------------------------------------------------------

export default InventoryRouter;
