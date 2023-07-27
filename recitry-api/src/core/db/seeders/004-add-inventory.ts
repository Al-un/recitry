import {
  InventoryModel,
  tableName as inventoryTableName,
} from "@/inventory/Inventory.model";
import { UserModel } from "@/um/User.model";
import { Seed } from "@/umzug";

import { userOne } from "@al-un/recitry-core/um/users.mocks";
import { userOneInventories } from "@al-un/recitry-core/inventory/inventory.mocks";
import { InventoryDetail } from "@al-un/recitry-core/inventory/inventory.models";
import { InventoryContainerModel } from "@/inventory/InventoryContainer.model";
import { InventoryItemModel } from "@/inventory/InventoryItem.model";

export const up: Seed = async ({ context: sequelize }) => {
  const firstUser = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (!firstUser) {
    throw new Error(`${userOne.username} user not yet created`);
  }

  const createInventory = async (i: InventoryDetail, u: UserModel) => {
    const inventory = await InventoryModel.create({
      name: i.name,
      authorId: u.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    for (let c of i.containers) {
      const container = await InventoryContainerModel.create({
        name: c.name,
        authorId: u.id,
        inventoryId: inventory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      for (let i of c.items) {
        await InventoryItemModel.create({
          name: i.name,
          quantity: i.quantity,
          dueDate: i.dueDate,
          authorId: u.id,
          containerId: container.id,
          materialId: i.material ? i.material.id : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  };

  await createInventory(userOneInventories.inventories[0], firstUser);
  await createInventory(userOneInventories.inventories[1], firstUser);
};

export const down: Seed = async ({ context: sequelize }) => {
  const firstUser = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (!firstUser) {
    throw new Error(`${userOne.username} user not yet created`);
  }

  await sequelize
    .getQueryInterface()
    .bulkDelete(
      inventoryTableName,
      { name: userOneInventories.inventories[0].name, authorId: firstUser },
      {}
    );
  await sequelize
    .getQueryInterface()
    .bulkDelete(
      inventoryTableName,
      { name: userOneInventories.inventories[1].name, authorId: firstUser },
      {}
    );
};
