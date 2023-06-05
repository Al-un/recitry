import {
  Inventory,
  InventoryContainer,
  InventoryContainerWithItems,
  InventoryCreation,
  InventoryDetail,
  InventoryItem,
} from "@al-un/ressaite-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { InventoryItemModel } from "./InventoryItem.model";
import { UserModel } from "@/um/models/User";
import { MaterialModel } from "@/recipe/Material.model";

export const createInventory = async (
  inventory: InventoryCreation,
  authorId: number
): Promise<Inventory> => {
  // console.log(`Creating inventory with author ${authorId}`, inventory);
  const i = await InventoryModel.create({
    name: inventory.name,
    authorId: authorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // for (let container of inventory.containers) {
  //   const c = await InventoryContainerModel.create({
  //     name: container.name,
  //     authorId: authorId,
  //     inventoryId: i.id,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   for (let item of container.items) {
  //     await InventoryItemModel.create({
  //       name: item.name,
  //       quantity: item.quantity,
  //       dueDate: item.dueDate,
  //       authorId: authorId,
  //       containerId: c.id,
  //       materialId: item.materialId,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //   }
  // }

  const result = await fetchInventory(i.id);
  if (!result) throw new Error("Created inventory not found");

  return result;
};

export const fetchInventory = async (
  inventoryId: number
): Promise<InventoryDetail | null> => {
  const i = await InventoryModel.findByPk(inventoryId, {
    include: [{ model: UserModel, attributes: ["id", "username"] }],
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
    include: [{ model: UserModel, attributes: ["id", "username"] }],
  });

  for (let c of containers) {
    const formattedContainer: InventoryContainerWithItems = {
      id: c.id,
      name: c.name,
      author: c.author.toMinimalProfile,
      items: [],
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };

    const items = await InventoryItemModel.findAll({
      where: { containerId: c.id },
      include: [
        { model: UserModel, attributes: ["id", "username"] },
        { model: MaterialModel, attributes: ["id", "name", "lang"] },
      ],
    });
    for (let item of items) {
      const formattedItem: InventoryItem = {
        id: item.id,
        name: item.name,
        dueDate: item.dueDate,
        author: item.author.toMinimalProfile,
        quantity: item.quantity,
        material: item.material ? item.material.toShortInfo : null,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      formattedContainer.items.push(formattedItem);
    }

    inventory.containers.push(formattedContainer);
  }

  return inventory;
};
