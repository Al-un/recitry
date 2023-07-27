import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import bcrypt from "bcrypt";

import { AccessTokenModel } from "./AccessToken.model";
import { UserMinimalProfile, User } from "@al-un/recitry-core/um/users.models";
import { Includeable } from "sequelize";

export const tableName = "user";

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
export class UserModel extends Model implements User {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ allowNull: false, type: DataType.STRING, unique: true })
  email!: string;

  @Column({ allowNull: true, unique: true, type: DataType.STRING })
  username!: string | null;

  @Column({ allowNull: false, type: DataType.STRING })
  get password(): string {
    return this.getDataValue("password");
  }
  set password(value: string) {
    const salt = generateSalt();
    const hash = hashPassword(value, salt);
    this.setDataValue("password", hash);
    this.setDataValue("salt", salt);
  }

  @Column({ allowNull: false, type: DataType.STRING })
  get salt(): string {
    return this.getDataValue("salt");
  }
  set salt(_: string) {
    throw new Error("Do not set salt value directly");
  }

  @HasMany(() => AccessTokenModel)
  accessTokens!: AccessTokenModel[];

  get toMinimalProfile(): UserMinimalProfile {
    return {
      id: this.id,
      username: this.username || this.email,
    };
  }
}

export const includeUserMinimalProfile: Includeable = {
  model: UserModel,
  attributes: ["id", "username", "email"],
};
