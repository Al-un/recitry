import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

import { Inventory } from "@al-un/ressaite-core/inventory/inventory.models";
import { UserModel } from "@/um/models/User";
import { InventoryContainerModel } from "./InventoryContainer.model";

export const tableName = "inventory";

@Table({
  tableName,
})
export class InventoryModel extends Model {
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

  @BelongsTo(() => UserModel, {})
  author!: UserModel;

  @HasMany(() => InventoryContainerModel, { onDelete: "CASCADE" })
  containers!: InventoryContainerModel[];

  get toResponseFormat(): Inventory {
    return {
      id: this.id,
      name: this.name,
      // author: { id: 123, username: "pouet" },
      author: this.author.toMinimalProfile,
      containers: [],
      // containers: this.containers.map(
      //   (container) => container.toResponseFormat
      // ),
    };
  }
}
