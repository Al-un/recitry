import { tableName as accessTokenTableName } from "@/um/models/AccessToken";
import { UserModel } from "@/um/models/User";
import { Seed } from "@/umzug";

import {
  userOneToken1,
  userOneExpiredToken,
} from "@al-un/ressaite-core/um/access-token.mocks";
import { userOne } from "@al-un/ressaite-core/um/users.mocks";

export const up: Seed = async ({ context: sequelize }) => {
  const firstUser = await UserModel.findOne({
    where: { username: userOne.username },
  });
  if (!firstUser) {
    throw new Error(`${userOne.username} user not yet created`);
  }

  await sequelize.getQueryInterface().bulkInsert(accessTokenTableName, [
    {
      token: userOneToken1.token,
      userId: firstUser.id,
      expiresAt: userOneToken1.expiresAt,
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
  ]);
};

export const down: Seed = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(accessTokenTableName, { token: userOneToken1.token }, {});
  await sequelize
    .getQueryInterface()
    .bulkDelete(accessTokenTableName, { token: userOneExpiredToken.token }, {});
};
