import { Column, HasMany, Model, Table } from "sequelize-typescript";
import bcrypt from "bcrypt";

import { AccessToken } from "./AccessToken";

export const tableName = "users";

export const generateSalt = (): string => {
  const salt = bcrypt.genSaltSync(10);
  return salt;
};

export const hashPassword = (clearPassword: string, salt: string): string => {
  const hash = bcrypt.hashSync(clearPassword, salt);
  return hash;
};

@Table({
  tableName,
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id!: number;

  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: false })
  get password(): string {
    return this.getDataValue("password");
  }
  set password(value: string) {
    const salt = generateSalt();
    const hash = hashPassword(value, salt);
    this.setDataValue("password", hash);
    this.setDataValue("salt", salt);
  }

  @Column({ allowNull: false })
  get salt(): string {
    return this.getDataValue("salt");
  }
  set salt(value: string) {
    throw new Error("Do not set salt value directly");
  }

  @Column
  email?: string;

  @HasMany(() => AccessToken)
  accessTokens!: AccessToken[];
}
