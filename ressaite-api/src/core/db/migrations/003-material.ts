import { DataTypes } from "sequelize";

import { tableName as materialTableName } from "@/recipe/Material.model";
import { tableName as userTableName } from "@/um/models/User";
import { Migration } from "@/umzug";
import { allLangs } from "@al-un/ressaite-core/core/models/lang";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(materialTableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lang: {
      allowNull: false,
      type: DataTypes.ENUM(...allLangs),
    },
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: userTableName,
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(materialTableName);
};
