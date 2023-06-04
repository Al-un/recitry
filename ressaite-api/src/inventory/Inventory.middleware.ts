import { RequestHandler } from "express";
import { InventoryModel } from "./Inventory.model";

export const canManageInventory: RequestHandler<{
  inventoryId: number;
}> = async (req, res, next) => {
  const userId = req.res?.locals.user?.id;
  if (!userId) throw new Error("req.user.id is not defined");

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

  next();
};
