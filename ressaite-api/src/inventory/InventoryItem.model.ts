import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { InventoryItem } from "@al-un/ressaite-core/inventory/inventory.models";
import { UserModel } from "@/um/User.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { MaterialModel } from "@/recipe/Material.model";

export const tableName = "inventory_item";

@Table({
  tableName,
})
export class InventoryItemModel extends Model {
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
  dueDate!: Date | null;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  authorId!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => InventoryContainerModel)
  containerId!: number;

  @BelongsTo(() => InventoryContainerModel)
  container!: InventoryContainerModel;

  @Column({ allowNull: true, type: DataType.INTEGER })
  @ForeignKey(() => MaterialModel)
  materialId!: number | null;

  @BelongsTo(() => MaterialModel)
  material!: MaterialModel | null;

  get toInventoryItem(): InventoryItem {
    return {
      id: this.id,
      containerId: this.containerId,
      name: this.name,
      author: this.author.toMinimalProfile,
      quantity: this.quantity,
      dueDate: this.dueDate,
      material: this.material ? this.material.toShortInfo : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
