import type { InventoryFormData, InventoryDetail } from "./inventory.models";
import { userOne } from "../um/users.mocks";
import { dumMatCarrot } from "../recipe/material.mocks";

type MockProfileData = {
  inventories: InventoryDetail[];
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
              dueDate: new Date("2029-12-31"),
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
                lang: "fr",
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
    },
  ],
};

export const mockCreateInventory: InventoryFormData = {
  id: null,
  name: "Inventory Name",
};

export const mockUpdateInventory: InventoryFormData = {
  id: null,
  name: "To be updated name",
};
