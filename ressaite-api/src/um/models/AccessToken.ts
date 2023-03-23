import { randomUUID } from "crypto";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "./User";

export const tableName = "access_token";

@Table({
  tableName,
})
export class AccessToken extends Model {
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
  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({ allowNull: false, type: DataType.DATE })
  expiresAt!: Date;

  init(user: User): void {
    this.token = randomUUID();
    this.userId = user.id;
    this.expiresAt = new Date();
    this.expiresAt.setDate(this.expiresAt.getDate() + 30);
  }
}
