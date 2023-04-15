import { tableName } from "@/um/models/AccessToken";
import { User } from "@/um/models/User";
import { Seed } from "@/umzug";

export const up: Seed = async ({ context: sequelize }) => {
  const admin = await User.findOne({ where: { username: "admin" } });
  if (!admin) {
    throw new Error("Admin user not yet created");
  }

  return sequelize.getQueryInterface().bulkInsert(tableName, [
    {
      token: "pouet",
      userId: admin.id,
      expiresAt: new Date("2099-12-31T23:59:59"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      token: "expired",
      userId: admin.id,
      expiresAt: new Date("2019-12-31T23:59:59"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seed = async ({ context: sequelize }) => {
  sequelize.getQueryInterface().bulkDelete(tableName, { token: "pouet" }, {});
  sequelize.getQueryInterface().bulkDelete(tableName, { token: "expired" }, {});
};
