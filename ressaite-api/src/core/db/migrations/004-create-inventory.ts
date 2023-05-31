import { DataTypes } from "sequelize";

import { tableName as userTableName } from "@/um/models/User";
import { tableName as inventoryTableName } from "@/inventory/Inventory.model";
import { tableName as inventoryContainerTableName } from "@/inventory/InventoryContainer.model";
import { tableName as inventoryItemTableName } from "@/inventory/InventoryItem.model";
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
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: userTableName,
        key: "id",
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
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
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: userTableName,
        key: "id",
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    inventoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: inventoryTableName,
        key: "id",
      },
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
    userId: {
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
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
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
  await sequelize.getQueryInterface().dropTable(inventoryTableName);
  await sequelize.getQueryInterface().dropTable(inventoryContainerTableName);
  await sequelize.getQueryInterface().dropTable(inventoryItemTableName);
};
