import { RequestHandler } from "express";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";
import { UserModel } from "@/um/models/User";

export const checkInventoryAuthor: RequestHandler<{
  inventoryId: number;
}> = async (req, res, next) => {
  const userId = req.res?.locals.user?.id;
  if (!userId) {
    res.status(400).send({ message: "userId parameter not found" });
    return;
  }

  const { inventoryId } = req.params;
  const inventory = await InventoryModel.findByPk(inventoryId, {
    include: { model: UserModel, attributes: ["id", "username"] },
  });
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

export const checkInventoryContainerAuthor: RequestHandler<{
  inventoryContainerId: number;
}> = async (req, res, next) => {
  const userId = req.res?.locals.user?.id;
  if (!userId) {
    res.status(400).send({ message: "userId parameter not found" });
    return;
  }

  const { inventoryContainerId } = req.params;
  const inventoryContainer = await InventoryContainerModel.findByPk(
    inventoryContainerId,
    {
      include: { model: UserModel, attributes: ["id", "username"] },
    }
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

export const checkInventoryItemAuthor: RequestHandler<{
  inventoryItemId: number;
}> = async (req, res, next) => {
  const userId = req.res?.locals.user?.id;
  if (!userId) {
    res.status(400).send({ message: "userId parameter not found" });
    return;
  }

  const { inventoryItemId } = req.params;
  const inventoryItem = await InventoryItemModel.findByPk(inventoryItemId, {
    include: { model: UserModel, attributes: ["id", "username"] },
  });
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
