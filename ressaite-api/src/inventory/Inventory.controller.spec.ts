import { expect } from "chai";
import request from "supertest";

import { AllRoutes } from "@al-un/ressaite-core";
import { buildRouteWithParam } from "@al-un/ressaite-core/core/base-api.utils";
import { userOneForeverToken } from "@al-un/ressaite-core/um/access-token.mocks";

import app from "@/app";
import { UserModel } from "@/um/models/User";
import { userOne } from "@al-un/ressaite-core/um/users.mocks";
import { InventoryCreation } from "@al-un/ressaite-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { userOneInventories } from "@al-un/ressaite-core/inventory/inventory.mocks";

describe("InventoryController", () => {
  let firstUser: UserModel;
  let firstInventory: InventoryModel;

  before(async () => {
    const userCandidate = await UserModel.findOne({
      where: { username: userOne.username },
    });
    if (userCandidate === null) throw new Error("User One not found");
    firstUser = userCandidate;

    const inventoryCandidate = await InventoryModel.findOne({
      where: {
        name: userOneInventories.inventories[0].name,
        authorId: firstUser.id,
      },
    });
    if (inventoryCandidate === null) throw new Error("Inventory one not found");
    firstInventory = inventoryCandidate
  });

  describe("for inventories", () => {
    const toCreateInventory: InventoryCreation = {
      name: "Inventory name",
      containers: [
        {
          name: "Container 1 name",
          inventoryId: null,
          items: [
            {
              name: "Item 1-1 name",
              quantity: 2,
              dueDate: null,
              inventoryContainerId: null,
              materialId: null,
            },
            {
              name: "Item 1-2 name",
              quantity: 16,
              dueDate: new Date(),
              inventoryContainerId: null,
              materialId: null,
            },
          ],
        },
        {
          name: "Container 2 name",
          inventoryId: null,
          items: [],
        },
      ],
    };

    describe("createInventory", async () => {
      it("creates inventory", async () => {
        const res = await request(app)
          .post(AllRoutes.inventoryCreate.path)
          .auth(userOneForeverToken.token, { type: "bearer" })
          .send(toCreateInventory);
        console.log(res.body);
        expect(res.status).to.equal(201);
      });
    });

    describe("updateInventory", async () => {});

    describe("deleteInventory", async () => {});

    describe("displayInventory", async () => {});

    describe("listInventories", async () => {});
  });

  describe.skip("for inventory containers", () => {
    describe("createInventoryContainer", async () => {
      it('returns "not implemented yet" error', async () => {
        const res = await request(app)
          .post(AllRoutes.inventoryContainerCreate.path)
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.equal(503);
        expect(res.body.message).to.equal("not implemented yet");
      });
    });

    describe("updateInventoryContainer", async () => {
      it('returns "not implemented yet" error', async () => {
        const res = await request(app)
          .patch(
            buildRouteWithParam(AllRoutes.inventoryContainerUpdate.path, {
              inventoryContainerId: 123,
            })
          )
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.equal(503);
        expect(res.body.message).to.equal("not implemented yet");
      });
    });

    describe("deleteInventoryContainer", async () => {
      it('returns "not implemented yet" error', async () => {
        const res = await request(app)
          .delete(
            buildRouteWithParam(AllRoutes.inventoryContainerDelete.path, {
              inventoryContainerId: 123,
            })
          )
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.equal(503);
        expect(res.body.message).to.equal("not implemented yet");
      });
    });
  });

  describe.skip("for inventory items", () => {
    describe("createInventoryItem", async () => {
      it('returns "not implemented yet" error', async () => {
        const res = await request(app)
          .post(AllRoutes.inventoryContainerCreate.path)
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.equal(503);
        expect(res.body.message).to.equal("not implemented yet");
      });
    });

    describe("updateInventoryItem", async () => {
      it('returns "not implemented yet" error', async () => {
        const res = await request(app)
          .patch(
            buildRouteWithParam(AllRoutes.inventoryContainerUpdate.path, {
              inventoryItemId: 123,
            })
          )
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.equal(503);
        expect(res.body.message).to.equal("not implemented yet");
      });
    });

    describe("deleteInventoryItem", async () => {
      it('returns "not implemented yet" error', async () => {
        const res = await request(app)
          .delete(
            buildRouteWithParam(AllRoutes.inventoryContainerDelete.path, {
              inventoryItemId: 123,
            })
          )
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.equal(503);
        expect(res.body.message).to.equal("not implemented yet");
      });
    });
  });
});
