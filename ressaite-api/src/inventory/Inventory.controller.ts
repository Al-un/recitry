import { InventoryEndpointTypes } from "@al-un/ressaite-core/inventory/inventory.endpoints";
import { InventoryListItem } from "@al-un/ressaite-core/inventory/inventory.models";
import { PaginatedResp } from "@al-un/ressaite-core/core/base-api.models";
import { parseDate } from "@al-un/ressaite-core/core/utils/datetime";

import { ExpressController } from "@/core/express";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";
import { includeUserMinimalProfile } from "@/um/User.model";

import * as InventoryService from "./Inventory.service";
import { includeMaterialShortInfo } from "@/recipe/Material.model";

// ----------------------------------------------------------------------------

type InventoryControllerTypes = ExpressController<
  InventoryEndpointTypes,
  {
    inventoryContainerCreate: {};
    inventoryContainerUpdate: {};
    inventoryContainerDelete: {};
    inventoryCreate: {};
    inventoryUpdate: {};
    inventoryDisplay: {};
    inventoryList: {};
    inventoryDelete: {};
    inventoryItemCreate: {};
    inventoryItemUpdate: {};
    inventoryItemDelete: {};
  }
>;

// ----------------------------------------------------------------------------

export const createInventory: InventoryControllerTypes["inventoryCreate"] =
  async (req, res) => {
    const authorId = req.user?.id;
    if (!authorId) throw new Error("req.user.id is not defined");

    const creationRequest = req.body;
    const inventory = await InventoryService.createInventory(
      creationRequest,
      authorId
    );

    res.status(201).json(inventory);
  };

export const updateInventory: InventoryControllerTypes["inventoryUpdate"] =
  async (req, res) => {
    const inventory = (req.res?.locals as any).inventory as InventoryModel;

    const updateRequest = req.body;
    inventory.set({
      name: updateRequest.name,
    });

    await inventory.save();

    res.status(200).json(inventory.toInventory);
  };

export const deleteInventory: InventoryControllerTypes["inventoryDelete"] =
  async (req, res) => {
    const inventory = (req.res?.locals as any).inventory as InventoryModel;

    await inventory.destroy();

    res.sendStatus(204);
  };

export const displayInventory: InventoryControllerTypes["inventoryDisplay"] =
  async (req, res) => {
    const inventoryId = req.params.inventoryId;
    if (!inventoryId) throw new Error(`Invalid inventoryId: ${inventoryId}`);

    const inventory = await InventoryService.fetchInventory(inventoryId);
    if (inventory === null) {
      res.status(404).json({ message: `Inventory ${inventoryId} not found` });
      return;
    }

    res.status(200).json(inventory);
  };

export const listInventories: InventoryControllerTypes["inventoryList"] =
  async (req, res) => {
    const userId = req.user?.id;
    if (!userId) throw new Error("req.user.id is not defined");

    const inventories = await InventoryModel.findAll({
      where: { authorId: userId },
      include: [includeUserMinimalProfile],
    });

    const responseContent: PaginatedResp<InventoryListItem[]> = {
      data: inventories.map((i) => i.toInventoryListItem),
      totalCount: inventories.length,
    };
    res.status(200).json(responseContent);
  };

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

export const createInventoryItem: InventoryControllerTypes["inventoryItemCreate"] =
  async (req, res) => {
    const userId = (req.res?.locals as any).user?.id;
    if (!userId) {
      res.status(400).send({ message: "userId parameter not found" });
      return;
    }

    const { inventoryId } = req.params;
    const inventory = await InventoryModel.findByPk(inventoryId);
    if (inventory === null) {
      res.sendStatus(404);
      return;
    }

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
        materialId: creationRequest.materialId,
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
    const inventoryItem = (req.res?.locals as any)
      .inventoryItem as InventoryItemModel;

    const updateRequest = req.body;

    console.log(`Updating item ${inventoryItem.id} with`, updateRequest);

    inventoryItem.set({
      name: updateRequest.name,
      containerId: updateRequest.containerId,
      quantity: updateRequest.quantity,
      dueDate: parseDate(updateRequest.dueDate || null),
      materialId: updateRequest.materialId,
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
    const inventoryItem = (req.res?.locals as any)
      .inventoryItem as InventoryItemModel;

    await inventoryItem.destroy();

    res.sendStatus(204);
  };
