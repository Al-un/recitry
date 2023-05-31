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

import { Inventory as InventoryResponse } from "@al-un/ressaite-core/inventory/inventory.models";
import { User } from "@/um/models/User";
import { InventoryContainer } from "./InventoryContainer.model";

export const tableName = "inventory";

@Table({
  tableName,
})
export class Inventory extends Model {
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

  @HasMany(() => InventoryContainer)
  containers!: InventoryContainer[];

  get toResponseFormat(): InventoryResponse {
    return {
      id: this.id,
      name: this.name,
      author: this.author.toMinimalProfile,
      containers: this.containers.map(
        (container) => container.toResponseFormat
      ),
    };
  }
}
