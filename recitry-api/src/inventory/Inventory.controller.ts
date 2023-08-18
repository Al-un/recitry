import { InventoryEndpointTypes } from "@al-un/recitry-core/inventory/inventory.endpoints";
import { InventoryListItem } from "@al-un/recitry-core/inventory/inventory.models";
import { PaginatedResp } from "@al-un/recitry-core/core/base-api.models";

import { ExpressController } from "@/core/express";
import { AuthLocals } from "@/um/Auth.middleware";
import { includeUserMinimalProfile } from "@/um/User.model";
import { InventoryModel } from "./Inventory.model";
import {
  HasCheckedInventoryContainerLocals,
  HasCheckedInventoryItemLocals,
  HasCheckedInventoryLocals,
} from "./Inventory.middleware";
import * as InventoryService from "./Inventory.service";

// ----------------------------------------------------------------------------

export type InventoryControllerTypes = ExpressController<
  InventoryEndpointTypes,
  {
    inventoryCreate: AuthLocals;
    inventoryList: AuthLocals;
    inventoryDisplay: AuthLocals;
    inventoryUpdate: HasCheckedInventoryLocals;
    inventoryDelete: HasCheckedInventoryLocals;
    inventoryContainerCreate: HasCheckedInventoryLocals;
    inventoryContainerUpdate: HasCheckedInventoryLocals &
      HasCheckedInventoryContainerLocals;
    inventoryContainerDelete: HasCheckedInventoryLocals &
      HasCheckedInventoryContainerLocals;
    inventoryItemCreate: HasCheckedInventoryLocals;
    inventoryItemUpdate: HasCheckedInventoryLocals &
      HasCheckedInventoryItemLocals;
    inventoryItemDelete: HasCheckedInventoryLocals &
      HasCheckedInventoryItemLocals;
  }
>;

// ----------------------------------------------------------------------------

export const createInventory: InventoryControllerTypes["inventoryCreate"] =
  async (req, res) => {
    const authorId = res.locals.user.id;

    const i = await InventoryService.createInventory(req.body, authorId);

    const inventory = await InventoryService.fetchInventory(i.id);
    if (inventory === null) {
      throw new Error(`Created inventory Id ${i.id} is null`);
    }

    res.status(201).json(inventory);
  };

export const updateInventory: InventoryControllerTypes["inventoryUpdate"] =
  async (req, res) => {
    const inventory = res.locals.inventory;

    const updateRequest = req.body;
    inventory.set({
      name: updateRequest.name,
    });

    await inventory.save();

    res.status(200).json(inventory.toInventory);
  };

export const deleteInventory: InventoryControllerTypes["inventoryDelete"] =
  async (_, res) => {
    const inventory = res.locals.inventory;

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
