import { randomUUID } from "crypto";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { InventoryContainer as InventoryContainerResponse } from "@al-un/ressaite-core/inventory/inventory.models";
import { User } from "@/um/models/User";
import { Inventory } from "./Inventory.model";
import { InventoryItem } from "./InventoryItem.model";

export const tableName = "inventory_container";

@Table({
  tableName,
})
export class InventoryContainer extends Model {
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
  @ForeignKey(() => User)
  authorId!: number;

  @BelongsTo(() => User)
  author!: User;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => Inventory)
  inventoryId!: number;

  @BelongsTo(() => User)
  inventory!: Inventory;

  @HasMany(() => InventoryItem)
  items!: InventoryItem[];

  get toResponseFormat(): InventoryContainerResponse {
    return {
      id: this.id,
      name: this.name,
      author: this.author.toMinimalProfile,
      items: this.items.map((item) => item.toResponseFormat),
    };
  }
}
