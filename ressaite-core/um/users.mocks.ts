import type { UserMinimalProfile } from "./users.models";

type MockProfileData = {
  minimalProfile: UserMinimalProfile;
};

export const userOne: MockProfileData = {
  minimalProfile: {
    id: 1,
    username: "Eve",
  },
};

export const userTwo: MockProfileData = {
  minimalProfile: {
    id: 1,
    username: "Adam, apres Eve",
  },
};
