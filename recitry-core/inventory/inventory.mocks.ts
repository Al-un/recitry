import type { InventoryFormData, InventoryDetail } from "./inventory.models";
import { userOne } from "../um/users.mocks";
import { dumMatCarrot } from "../recipe/material.mocks";

type MockProfileData = {
  inventories: InventoryDetail[];
};

export const userOneInventoryOne: InventoryDetail = {
  id: 12,
  name: "Mon premier inventaire",
  author: userOne.minimalProfile,
  containers: [
    {
      id: 121,
      inventoryId: 12,
      name: "Mon premier container",
      author: userOne.minimalProfile,
      items: [
        {
          id: 1211,
          containerId: 121,
          author: userOne.minimalProfile,
          name: "Mon premier objet",
          material: null,
          quantity: 8,
          dueDate: "2029-12-31",
        },
        {
          id: 1212,
          containerId: 121,
          author: userOne.minimalProfile,
          name: "Mon deuxieme objet",
          material: null,
          quantity: 42,
          dueDate: null,
        },
        {
          id: 1213,
          containerId: 121,
          author: userOne.minimalProfile,
          name: "Ma carotte",
          material: {
            id: dumMatCarrot.id,
            name: dumMatCarrot.name,
          },
          quantity: 7,
          dueDate: "2023-03-23",
        },
      ],
    },
  ],
};

export const userOneInventoryTwo: InventoryDetail = {
  id: 21,
  name: "Mon deuz",
  author: userOne.minimalProfile,
  containers: [
    {
      id: 211,
      inventoryId: 21,
      name: "Mon premier container",
      author: userOne.minimalProfile,
      items: [
        {
          id: 2111,
          author: userOne.minimalProfile,
          name: "Mon premier objet",
          containerId: 211,
          material: null,
          quantity: 8,
          dueDate: null,
        },
      ],
    },
  ],
};
