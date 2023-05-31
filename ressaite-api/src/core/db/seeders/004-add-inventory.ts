import {
  InventoryModel,
  tableName as inventoryTableName,
} from "@/inventory/Inventory.model";
import { tableName as inventoryContainerTableName } from "@/inventory/InventoryContainer.model";
import { tableName as inventoryItemTableName } from "@/inventory/InventoryItem.model";
import { UserModel } from "@/um/models/User";
import { Seed } from "@/umzug";

import { userOne } from "@al-un/ressaite-core/um/users.mocks";
import { userOneInventories } from "@al-un/ressaite-core/inventory/inventory.mocks";
import { InventoryContainerModel } from "@/inventory/InventoryContainer.model";
import { InventoryItemModel } from "@/inventory/InventoryItem.model";

export const up: Seed = async ({ context: sequelize }) => {
  const firstUser = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (!firstUser) {
    throw new Error(`${userOne.username} user not yet created`);
  }

  const inventoryOne = userOneInventories.inventories[0];

  // await sequelize.getQueryInterface().bulkInsert(inventoryTableName, [
  //   {
  //     name: inventoryOne.name,
  //     authorId: firstUser.id,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ]);
  // let createdInventory = await InventoryModel.findOne({
  //   where: { name: inventoryOne.name, authorId: firstUser.id },
  // });
  // if (createdInventory === null) throw new Error("Created inventory not found");
  // console.log("CREATED", createdInventory)
  // const containers = inventoryOne.containers.map((c) => ({
  //   name: c.name,
  //   authorId: firstUser.id,
  //   inventoryId: createdInventory?.id,
  // }));
  // await sequelize
  //   .getQueryInterface()
  //   .bulkInsert(inventoryContainerTableName, containers);
  
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
