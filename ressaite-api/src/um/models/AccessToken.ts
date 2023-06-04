import { randomUUID } from "crypto";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { UserModel } from "./User";
import { AccessToken } from "@al-un/ressaite-core/um/access-token.models";

export const tableName = "access_token";

@Table({
  tableName,
})
export class AccessTokenModel extends Model implements AccessToken {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  token!: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @Column({ allowNull: false, type: DataType.DATE })
  expiresAt!: Date;

  init(user: UserModel): void {
    this.token = randomUUID();
    this.userId = user.id;
    this.expiresAt = new Date();
    this.expiresAt.setDate(this.expiresAt.getDate() + 30);
  }
}
