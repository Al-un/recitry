import {
  Inventory,
  InventoryContainerWithItems,
  InventoryFormData,
  InventoryDetail,
  InventoryItem,
} from "@al-un/ressaite-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";
import { UserModel, includeUserMinimalProfile } from "@/um/User.model";
import {
  MaterialModel,
  includeMaterialShortInfo,
} from "@/recipe/Material.model";

export const createInventory = async (
  inventory: InventoryFormData,
  authorId: number
): Promise<Inventory> => {
  const i = await InventoryModel.create({
    name: inventory.name,
    authorId: authorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const result = await fetchInventory(i.id);
  if (!result) throw new Error("Created inventory not found");

  return result;
};

export const fetchInventory = async (
  inventoryId: number
): Promise<InventoryDetail | null> => {
  const i = await InventoryModel.findByPk(inventoryId, {
    include: [includeUserMinimalProfile],
  });
  if (i === null) return null;

  const inventory: InventoryDetail = {
    id: i.id,
    name: i.name,
    author: i.author.toMinimalProfile,
    containers: [],
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
  };

  const containers = await InventoryContainerModel.findAll({
    where: { inventoryId: i.id },
    include: [includeUserMinimalProfile],
  });

  for (let c of containers) {
    const formattedContainer: InventoryContainerWithItems = {
      id: c.id,
      inventoryId: i.id,
      name: c.name,
      author: c.author.toMinimalProfile,
      items: [],
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };

    const items = await InventoryItemModel.findAll({
      where: { containerId: c.id },
      include: [includeUserMinimalProfile, includeMaterialShortInfo],
    });
    for (let item of items) {
      formattedContainer.items.push(item.toInventoryItem);
    }

    inventory.containers.push(formattedContainer);
  }

  return inventory;
};
