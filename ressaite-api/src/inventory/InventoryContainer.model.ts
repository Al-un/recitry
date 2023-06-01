import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { InventoryContainer } from "@al-un/ressaite-core/inventory/inventory.models";
import { UserModel } from "@/um/models/User";
import { InventoryModel } from "./Inventory.model";
import { InventoryItemModel } from "./InventoryItem.model";

export const tableName = "inventory_container";

@Table({
  tableName,
})
export class InventoryContainerModel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name!: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  authorId!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => InventoryModel)
  inventoryId!: number;

  @BelongsTo(() => InventoryModel)
  inventory!: InventoryModel;

  @HasMany(() => InventoryItemModel, { onDelete: "CASCADE" })
  items!: InventoryItemModel[];

  get toResponseFormat(): InventoryContainer {
    return {
      id: this.id,
      name: this.name,
      author: this.author.toMinimalProfile,
      items: this.items.map((item) => item.toResponseFormat),
    };
  }
}