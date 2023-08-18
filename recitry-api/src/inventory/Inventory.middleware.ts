import { RequestHandler } from "express";

import { AuthLocals } from "@/um/Auth.middleware";
import { UserModel } from "@/um/User.model";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";

// ----------------------------------------------------------------------------

export interface HasCheckedInventoryLocals extends AuthLocals {
  inventory: InventoryModel;
}

export interface HasCheckedInventoryContainerLocals extends AuthLocals {
  inventoryContainer: InventoryContainerModel;
}

export interface HasCheckedInventoryItemLocals extends AuthLocals {
  inventoryItem: InventoryItemModel;
}

// ----------------------------------------------------------------------------

export const checkInventoryAuthor: RequestHandler<
  { inventoryId: number },
  any,
  any,
  any,
  HasCheckedInventoryLocals
> = async (req, res, next) => {
  const userId = res.locals.user.id;

  const { inventoryId } = req.params;
  const inventory = await InventoryModel.findByPk(inventoryId);
  if (inventory === null) {
    res.sendStatus(404);
    return;
  }

  const isAuthor = inventory.authorId === userId;
  if (!isAuthor) {
    res.sendStatus(403);
    return;
  }

  res.locals.inventory = inventory;
  next();
};

export const checkInventoryContainerAuthor: RequestHandler<
  { inventoryContainerId: number },
  any,
  any,
  any,
  HasCheckedInventoryContainerLocals
> = async (req, res, next) => {
  const userId = res.locals.user.id;

  const { inventoryContainerId } = req.params;
  const inventoryContainer = await InventoryContainerModel.findByPk(
    inventoryContainerId
  );
  if (inventoryContainer === null) {
    res.sendStatus(404);
    return;
  }

  const isAuthor = inventoryContainer.authorId === userId;
  if (!isAuthor) {
    res.sendStatus(403);
    return;
  }

  res.locals.inventoryContainer = inventoryContainer;
  next();
};

export const checkInventoryItemAuthor: RequestHandler<
  { inventoryItemId: number },
  any,
  any,
  any,
  HasCheckedInventoryItemLocals
> = async (req, res, next) => {
  const userId = res.locals.user.id;

  const { inventoryItemId } = req.params;
  const inventoryItem = await InventoryItemModel.findByPk(inventoryItemId);
  if (inventoryItem === null) {
    res.sendStatus(404);
    return;
  }

  const isAuthor = inventoryItem.authorId === userId;
  if (!isAuthor) {
    res.sendStatus(403);
    return;
  }

  res.locals.inventoryItem = inventoryItem;
  next();
};
