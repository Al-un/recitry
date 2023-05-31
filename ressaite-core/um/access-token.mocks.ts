import { AccessToken } from "./access-token.models";
import { userOne } from "./users.mocks";

class MockAccessTokenData implements AccessToken {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;

  constructor(options: AccessToken) {
    this.id = options.id;
    this.token = options.token;
    this.userId = options.userId;
    this.expiresAt = options.expiresAt;
  }
}

/** Never ending token for userOne */
export const userOneToken1 = new MockAccessTokenData({
  id: 1,
  token: "pouet",
  expiresAt: new Date("2099-12-31T23:59:59"),
  userId: userOne.id,
});

/** Should not work.... */
export const userOneExpiredToken = new MockAccessTokenData({
  id: userOneToken1.id + 1,
  token: "expired",
  expiresAt: new Date("2019-12-31T23:59:59"),
  userId: userOne.id,
});
