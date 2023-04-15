import { tableName } from "@/um/models/User";
import { Seed } from "@/umzug";

export const up: Seed = async ({ context: sequelize }) => {
  return sequelize.getQueryInterface().bulkInsert(tableName, [
    {
      username: "admin",
      // "pouetpouet" with the salt below
      password: "$2b$10$EuERg7PrpZtUDVr5MKXYYOzuJQUWiOFuY7C4FtKiP3rwwbMIBtaVu",
      email: "admin@ressaite.fr",
      salt: "$2b$10$EuERg7PrpZtUDVr5MKXYYO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seed = async ({ context: sequelize }) => {
  sequelize
    .getQueryInterface()
    .bulkDelete(tableName, { email: "ressaite@al-un.fr" }, {});
};
