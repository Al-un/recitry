import { userOne } from "../um/users.mocks";
import { Material } from "./material.models";

export const dumMatCarrot: Material = {
  id: 1,
  name: "Carotte",
  lang: "fr",
  author: userOne.minimalProfile,
};

export const dumMatApple: Material = {
  id: dumMatCarrot.id + 1,
  name: "Pomme",
  lang: "fr",
  author: userOne.minimalProfile,
};

export const dumMatOnion: Material = {
  id: dumMatApple.id + 1,
  name: "Onion",
  lang: "en",
  author: userOne.minimalProfile,
};

export const dumMatWakame: Material = {
  id: dumMatOnion.id + 1,
  name: "わかめ",
  lang: "jp",
  author: userOne.minimalProfile,
};
