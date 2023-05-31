import {
  Inventory,
  InventoryCreation,
} from "@al-un/ressaite-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";

export const createInventory = async (
  inventory: InventoryCreation,
  authorId: number
): Promise<Inventory> => {
  console.log(`Creating inventory with author ${authorId}`, inventory);
  const i = await InventoryModel.create({
    name: inventory.name,
    authorId: authorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  for (let container of inventory.containers) {
    const c = await InventoryContainerModel.create({
      name: container.name,
      authorId: authorId,
      inventoryId: i.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    for (let item of container.items) {
      await InventoryItemModel.create({
        name: item.name,
        quantity: item.quantity,
        dueDate: item.dueDate,
        authorId: authorId,
        containerId: c.id,
        materialId: item.materialId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  const result = await fetchInventory(i.id);
  if (!result) throw new Error("Created inventory not found");

  return result;
};

export const fetchInventory = async (
  inventoryId: number
): Promise<Inventory | null> => {
  const inventory = await InventoryModel.findByPk(inventoryId);
  if (inventory === null) return null;

  return {
    id: inventory.id,
    name: inventory.name,
    author: { id: 123, username: "pouet" },
    // author: inventory.author.toMinimalProfile,
    containers: [],
  };
};
