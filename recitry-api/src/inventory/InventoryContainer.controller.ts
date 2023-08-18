import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryModel } from "./Inventory.model";
import { InventoryControllerTypes } from "./Inventory.controller";
import { InventoryContainerModel } from "./InventoryContainer.model";
import * as InventoryContainerService from "./InventoryContainer.service";

// ----------------------------------------------------------------------------

export const createInventoryContainer: InventoryControllerTypes["inventoryContainerCreate"] =
  async (req, res) => {
    const userId = res.locals.user.id;
    const inventory = res.locals.inventory;

    const created = await InventoryContainerService.createInDb(
      { ...req.body, inventoryId: inventory.id },
      userId
    );

    const c = await InventoryContainerService.fetchFromDb(created.id);
    res.status(201).json(c);
  };


export const updateInventoryContainer: InventoryControllerTypes["inventoryContainerUpdate"] =
  async (req, res) => {
    const container = res.locals.inventoryContainer;

    const updated = await InventoryContainerService.updateInDb(
      container,
      req.body
    );

    const c = await InventoryContainerService.fetchFromDb(updated.id);
    res.status(200).json(c);
  };

export const deleteInventoryContainer: InventoryControllerTypes["inventoryContainerDelete"] =
  async (_, res) => {
    const container = res.locals.inventoryContainer;

    InventoryContainerService.deleteInDb(container);

    res.sendStatus(204);
  };
