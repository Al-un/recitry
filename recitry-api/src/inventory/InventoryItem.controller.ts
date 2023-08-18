import { parseDate } from "@al-un/recitry-core/core/utils/datetime";

import { includeMaterialShortInfo } from "@/recipe/Material.model";
import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryControllerTypes } from "./Inventory.controller";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";

// ----------------------------------------------------------------------------

export const createInventoryItem: InventoryControllerTypes["inventoryItemCreate"] =
  async (req, res) => {
    const userId = res.locals.user.id;
    const inventory = res.locals.inventory;

    const creationRequest = req.body;

    const inventoryContainer = await InventoryContainerModel.findByPk(
      creationRequest.containerId
    );
    if (inventoryContainer === null) {
      res.sendStatus(404);
      return;
    }

    const created = await InventoryItemModel.create(
      {
        name: creationRequest.name,
        quantity: creationRequest.quantity,
        dueDate: parseDate(creationRequest.dueDate),
        materialId: creationRequest.material?.id || null,
        authorId: userId,
        containerId: creationRequest.containerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [includeUserMinimalProfile] }
    );
    const ii = await InventoryItemModel.findByPk(created.id, {
      include: [includeUserMinimalProfile, includeMaterialShortInfo],
    });
    if (ii === null) throw new Error("Created container not found");

    res.status(201).json(ii.toInventoryItem);
  };

/**
 * An item cannot be transferred to another container
 */
export const updateInventoryItem: InventoryControllerTypes["inventoryItemUpdate"] =
  async (req, res) => {
    const inventoryItem = res.locals.inventoryItem;

    const updateRequest = req.body;

    console.log(
      `${res.locals.requestId}: updating item ${inventoryItem.id} with`,
      updateRequest
    );

    inventoryItem.set({
      name: updateRequest.name,
      containerId: updateRequest.containerId,
      quantity: updateRequest.quantity,
      dueDate: parseDate(updateRequest.dueDate || null),
      materialId: updateRequest.material?.id || null,
      updatedAt: new Date(),
    });

    await inventoryItem.save();

    const ii = await InventoryItemModel.findByPk(inventoryItem.id, {
      include: [includeUserMinimalProfile, includeMaterialShortInfo],
    });
    if (ii === null) throw new Error("Created container not found");

    res.status(200).json(ii.toInventoryItem);
  };

export const deleteInventoryItem: InventoryControllerTypes["inventoryItemDelete"] =
  async (req, res) => {
    const inventoryItem = res.locals.inventoryItem;

    await inventoryItem.destroy();

    res.sendStatus(204);
  };
