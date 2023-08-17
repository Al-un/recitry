import { InventoryEndpointTypes } from "@al-un/recitry-core/inventory/inventory.endpoints";
import { InventoryListItem } from "@al-un/recitry-core/inventory/inventory.models";
import { PaginatedResp } from "@al-un/recitry-core/core/base-api.models";

import { ExpressController } from "@/core/express";
import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryModel } from "./Inventory.model";
import * as InventoryService from "./Inventory.service";

// ----------------------------------------------------------------------------

export type InventoryControllerTypes = ExpressController<
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

    const { page, limit } = req.query;

    const inventories = await InventoryModel.findAll({
      where: { authorId: userId },
      offset: (page - 1) * limit,
      limit,
      include: [includeUserMinimalProfile],
    });

    const responseContent: PaginatedResp<InventoryListItem[]> = {
      data: inventories.map((i) => i.toInventoryListItem),
      totalCount: inventories.length,
    };
    res.status(200).json(responseContent);
  };
