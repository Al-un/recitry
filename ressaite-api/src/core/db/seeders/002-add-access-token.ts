import { tableName as accessTokenTableName } from "@/um/models/AccessToken";
import { UserModel } from "@/um/models/User";
import { Seed } from "@/umzug";

import {
  userOneForeverToken,
  userOneExpiredToken,
  userTwoForeverToken,
} from "@al-un/ressaite-core/um/access-token.mocks";
import { userOne, userTwo } from "@al-un/ressaite-core/um/users.mocks";

export const up: Seed = async ({ context: sequelize }) => {
  const firstUser = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (!firstUser) {
    throw new Error(`${userOne.username} user not yet created`);
  }
  const secondUser = await UserModel.findOne({
    where: { username: userTwo.username },
  });
  if (!secondUser) {
    throw new Error(`${userTwo.username} user not yet created`);
  }

  await sequelize.getQueryInterface().bulkInsert(accessTokenTableName, [
    {
      token: userOneForeverToken.token,
      userId: firstUser.id,
      expiresAt: userOneForeverToken.expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      token: userOneExpiredToken.token,
      userId: firstUser.id,
      expiresAt: userOneExpiredToken.expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      token: userTwoForeverToken.token,
      userId: secondUser.id,
      expiresAt: userTwoForeverToken.expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seed = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(accessTokenTableName, { token: userOneForeverToken.token }, {});
  await sequelize
    .getQueryInterface()
    .bulkDelete(accessTokenTableName, { token: userOneExpiredToken.token }, {});
};
