import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryModel } from "./Inventory.model";
import { InventoryControllerTypes } from "./Inventory.controller";
import { InventoryContainerModel } from "./InventoryContainer.model";
import * as InventoryContainerService from "./InventoryContainer.service";

// ----------------------------------------------------------------------------

export const createInventoryContainer: InventoryControllerTypes["inventoryContainerCreate"] =
  async (req, res) => {
    const userId = (req.res?.locals as any).user?.id;
    if (!userId) {
      res.status(400).send({ message: "userId parameter not found" });
      return;
    }

    const { inventoryId } = req.params;
    const inventory = await InventoryModel.findByPk(inventoryId, {
      include: [includeUserMinimalProfile],
    });
    if (inventory === null) {
      res.sendStatus(404);
      return;
    }

    const created = await InventoryContainerService.createInDb(
      { ...req.body, inventoryId },
      userId
    );

    const c = await InventoryContainerService.fetchFromDb(created.id);

    res.status(201).json(c);
  };

/**
 * Only name can be modified, a container cannot be transferred to another inventory
 */
export const updateInventoryContainer: InventoryControllerTypes["inventoryContainerUpdate"] =
  async (req, res) => {
    const inventoryContainer = (req.res?.locals as any)
      .inventoryContainer as InventoryContainerModel;

    const updateRequest = req.body;
    inventoryContainer.set({
      name: updateRequest.name,
      updatedAt: new Date(),
    });

    await inventoryContainer.save();

    res.status(200).json(inventoryContainer.toInventoryContainer);
  };

export const deleteInventoryContainer: InventoryControllerTypes["inventoryContainerDelete"] =
  async (req, res) => {
    const container = (req.res?.locals as any)
      .inventoryContainer as InventoryContainerModel;

    InventoryContainerService.deleteInDb(container);

    res.sendStatus(204);
  };
