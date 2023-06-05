import type { Inventory } from "./inventory.models";
import { userOne } from "../um/users.mocks";
import { dumMatCarrot } from "../recipe/material.mocks";

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
              quantity: 8,
              dueDate: new Date("2029-12-31"),
            },
            {
              id: 1212,
              author: userOne.minimalProfile,
              name: "Mon deuxieme objet",
              material: null,
              quantity: 42,
              dueDate: null,
            },
            {
              id: 1213,
              author: userOne.minimalProfile,
              name: "Ma carotte",
              material: {
                id: dumMatCarrot.id,
                name: dumMatCarrot.name,
              },
              quantity: 7,
              dueDate: new Date("2023-03-23"),
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
              quantity: 8,
              dueDate: null,
            },
          ],
        },
      ],
    },
  ],
};
