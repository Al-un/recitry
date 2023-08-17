import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryControllerTypes } from "./Inventory.controller";

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

    const creationRequest = req.body;
    const created = await InventoryContainerModel.create({
      name: creationRequest.name,
      authorId: userId,
      inventoryId: inventoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const c = await InventoryContainerModel.findByPk(created.id, {
      include: [includeUserMinimalProfile],
    });
    if (c === null) throw new Error("Created container not found");

    res.status(201).json(c.toInventoryContainer);
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
    const inventoryContainer = (req.res?.locals as any)
      .inventoryContainer as InventoryContainerModel;

    await inventoryContainer.destroy();

    res.sendStatus(204);
  };
