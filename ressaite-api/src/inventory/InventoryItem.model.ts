import { randomUUID } from "crypto";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { InventoryItem as InventoryItemResponse } from "@al-un/ressaite-core/inventory/inventory.models";
import { User } from "@/um/models/User";
import { InventoryContainer } from "./InventoryContainer.model";

export const tableName = "inventory_item";

@Table({
  tableName,
})
export class InventoryItem extends Model {
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
  quantity!: number;

  @Column({ allowNull: true, type: DataType.DATE })
  dueDate!: Date;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => User)
  authorId!: number;

  @BelongsTo(() => User)
  author!: User;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => InventoryContainer)
  inventoryContainerId!: number;

  @BelongsTo(() => User)
  inventoryContainer!: InventoryContainer;

  get toResponseFormat(): InventoryItemResponse {
    return {
      id: this.id,
      name: this.name,
      author: this.author.toMinimalProfile,
      quantity: this.quantity,
      dueDate: this.dueDate,
      material: null, // not handled for now
    };
  }
}
