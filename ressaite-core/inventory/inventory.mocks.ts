import type { Inventory } from "./inventory.models";
import { userOne } from "../um/users.mocks";

type MockProfileData = {
  inventories: Inventory[];
};

export const userOneInventories: MockProfileData = {
  inventories: [
    {
      id: 12,
      name: "Mon premier inventaire",
      author: userOne.minimalProfile,
      containers: [
        {
          id: 121,
          name: "Mon premier container",
          author: userOne.minimalProfile,
          items: [
            {
              id: 1211,
              author: userOne.minimalProfile,
              name: "Mon premier objet",
              material: null,
              qty: 8,
            },
            {
              id: 1212,
              author: userOne.minimalProfile,
              name: "Mon deuxieme objet",
              material: null,
              qty: 42,
            },
          ],
        },
      ],
    },
    {
      id: 21,
      name: "Mon deuz",
      author: userOne.minimalProfile,
      containers: [
        {
          id: 211,
          name: "Mon premier container",
          author: userOne.minimalProfile,
          items: [
            {
              id: 2111,
              author: userOne.minimalProfile,
              name: "Mon premier objet",
              material: null,
              qty: 8,
            },
          ],
        },
      ],
    },
  ],
};
