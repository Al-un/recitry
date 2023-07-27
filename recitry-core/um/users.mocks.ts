import type { UserFullProfile, UserMinimalProfile, User } from "./users.models";

interface MockUser extends User {
  clearPassword: string;
  /** To force specific createdAt */
  createdAt?: Date;
}

class MockUserData implements MockUser {
  id: number;
  username: string | null;
  email: string;
  password: string;
  clearPassword: string;
  salt: string;
  createdAt?: Date;

  constructor(options: MockUser) {
    this.id = options.id;
    this.username = options.username;
    this.email = options.email;
    this.password = options.password;
    this.clearPassword = options.clearPassword;
    this.salt = options.salt;
    this.createdAt = options.createdAt;
  }

  get minimalProfile(): UserMinimalProfile {
    return {
      id: this.id,
      username: this.username || this.email,
    };
  }

  get fullProfile(): UserFullProfile {
    return {
      ...this.minimalProfile,
      email: this.email,
    };
  }
}

export const userOne = new MockUserData({
  id: 1,
  username: "Eve",
  email: "eve@recitry.fr",
  password: "$2b$10$EuERg7PrpZtUDVr5MKXYYOzuJQUWiOFuY7C4FtKiP3rwwbMIBtaVu",
  clearPassword: "pouetpouet",
  salt: "$2b$10$EuERg7PrpZtUDVr5MKXYYO",
});

export const userTwo = new MockUserData({
  id: 2,
  username: "Alice", // pas Adam
  email: "alice@recitry.fr",
  password: "$2b$10$EuERg7PrpZtUDVr5MKXYYOzuJQUWiOFuY7C4FtKiP3rwwbMIBtaVu",
  clearPassword: "pouetpouet",
  salt: "$2b$10$EuERg7PrpZtUDVr5MKXYYO",
});
