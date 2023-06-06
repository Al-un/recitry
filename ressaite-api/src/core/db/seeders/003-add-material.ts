import { tableName as materialTableName } from "@/recipe/Material.model";
import { UserModel } from "@/um/User.model";
import { Seed } from "@/umzug";

import { userOne } from "@al-un/ressaite-core/um/users.mocks";
import {
  dumMatCarrot,
  dumMatApple,
  dumMatOnion,
  dumMatWakame,
} from "@al-un/ressaite-core/recipe/material.mocks";

export const up: Seed = async ({ context: sequelize }) => {
  const firstUser = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (!firstUser) {
    throw new Error(`${userOne.username} user not yet created`);
  }

  await sequelize.getQueryInterface().bulkInsert(materialTableName, [
    {
      name: dumMatCarrot.name,
      lang: dumMatCarrot.lang,
      authorId: firstUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: dumMatApple.name,
      lang: dumMatApple.lang,
      authorId: firstUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: dumMatOnion.name,
      lang: dumMatOnion.lang,
      authorId: firstUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: dumMatWakame.name,
      lang: dumMatWakame.lang,
      authorId: firstUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seed = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(materialTableName, { name: dumMatCarrot.name }, {});
  await sequelize
    .getQueryInterface()
    .bulkDelete(materialTableName, { name: dumMatApple.name }, {});
  await sequelize
    .getQueryInterface()
    .bulkDelete(materialTableName, { name: dumMatOnion.name }, {});
  await sequelize
    .getQueryInterface()
    .bulkDelete(materialTableName, { name: dumMatWakame.name }, {});
};
