import { randomUUID } from "crypto";
import {
  BelongsTo,
  Column,
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
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  token!: string;

  @Column({ allowNull: false })
  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({ allowNull: false })
  expiresAt!: Date;

  init(user: User): void {
    this.token = randomUUID();
    this.userId = user.id;
    this.expiresAt = new Date();
    this.expiresAt.setDate(this.expiresAt.getDate() + 30);
  }
}
