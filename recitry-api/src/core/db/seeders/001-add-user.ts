import { tableName as userTableName } from "@/um/User.model";
import { Seed } from "@/umzug";

import { userOne, userTwo } from "@al-un/recitry-core/um/users.mocks";

export const up: Seed = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(userTableName, [
    {
      username: userOne.username,
      password: userOne.password,
      email: userOne.email,
      salt: userOne.salt,
      createdAt: userOne.createdAt || new Date(),
      updatedAt: new Date(),
    },
    {
      username: userTwo.username,
      password: userTwo.password,
      email: userTwo.email,
      salt: userTwo.salt,
      createdAt: userTwo.createdAt || new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seed = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(userTableName, { username: userOne.username }, {});
};
