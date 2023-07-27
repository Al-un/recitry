import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import {
  Material,
  MaterialShortInfo,
} from "@al-un/ressaite-core/recipe/material.models";
import { UserModel } from "@/um/User.model";
import { Lang, allLangs } from "@al-un/ressaite-core/core/models/lang";
import { Includeable } from "sequelize";

export const tableName = "material";

@Table({
  tableName,
})
export class MaterialModel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING, unique: true })
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

  get toShortInfo(): MaterialShortInfo {
    return {
      id: this.id,
      name: this.name,
    };
  }

  get toMaterial(): Material {
    return {
      id: this.id,
      name: this.name,
      lang: this.lang,
      author: this.author.toMinimalProfile,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export const includeMaterialShortInfo: Includeable = {
  model: MaterialModel,
  attributes: ["id", "name"],
};
