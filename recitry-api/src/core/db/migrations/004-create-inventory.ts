import { DataTypes } from "sequelize";

import { tableName as userTableName } from "@/um/User.model";
import { tableName as inventoryTableName } from "@/inventory/Inventory.model";
import { tableName as inventoryContainerTableName } from "@/inventory/InventoryContainer.model";
import { tableName as inventoryItemTableName } from "@/inventory/InventoryItem.model";
import { tableName as materialTableName } from "@/recipe/Material.model";
import { Migration } from "@/umzug";

export const up: Migration = async ({ context: sequelize }) => {
  // ---------- Inventory table
  await sequelize.getQueryInterface().createTable(inventoryTableName, {
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

  // ---------- Inventory Container table
  await sequelize.getQueryInterface().createTable(inventoryContainerTableName, {
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
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: userTableName,
        key: "id",
      },
    },
    inventoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: inventoryTableName,
        key: "id",
      },
      onDelete: "CASCADE",
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

  // ---------- Inventory Item table
  await sequelize.getQueryInterface().createTable(inventoryItemTableName, {
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
    dueDate: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    authorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: userTableName,
        key: "id",
      },
    },
    containerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: inventoryContainerTableName,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    materialId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: materialTableName,
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
  await sequelize.getQueryInterface().dropTable(inventoryItemTableName);
  await sequelize.getQueryInterface().dropTable(inventoryContainerTableName);
  await sequelize.getQueryInterface().dropTable(inventoryTableName);
};
