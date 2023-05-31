import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Material } from "@al-un/ressaite-core/recipe/material.models";
import { UserModel } from "@/um/models/User";
import { Lang, allLangs } from "@al-un/ressaite-core/core/models/lang";

export const tableName = "material";

@Table({
  tableName,
})
export class MaterialModel extends Model implements Material {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name!: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...allLangs),
  })
  lang!: Lang;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  authorId!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;
}
