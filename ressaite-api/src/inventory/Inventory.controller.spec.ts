import { expect } from "chai";
import request from "supertest";

import { AllRoutes } from "@al-un/ressaite-core";
import { buildRouteWithParam } from "@al-un/ressaite-core/core/base-api.utils";
import { userOneForeverToken } from "@al-un/ressaite-core/um/access-token.mocks";

import app from "@/app";
import { UserModel } from "@/um/User.model";
import { userOne } from "@al-un/ressaite-core/um/users.mocks";
import { InventoryFormData } from "@al-un/ressaite-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { userOneInventories } from "@al-un/ressaite-core/inventory/inventory.mocks";
import { testAuthentication } from "@/um/Auth.middleware.spec";
import { InventoryContainerModel } from "./InventoryContainer.model";

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
    firstInventory = inventoryCandidate;
  });

  describe("for inventories", () => {
    const toCreateInventory: InventoryFormData = {
      id: null,
      name: "Inventory name",
    };

    describe("createInventory", async () => {
      testAuthentication(
        request(app)
          .post(AllRoutes.inventoryCreate.path)
          .send(toCreateInventory)
      );

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

    describe("deleteInventory", async () => {
      const testAuthRoute = buildRouteWithParam(
        AllRoutes.inventoryDelete.path,
        { inventoryId: 9999 }
      );
      testAuthentication(request(app).delete(testAuthRoute));

      it("returns 404 when inventoryId does not exist", async () => {
        const res = await request(app)
          .delete(testAuthRoute)
          .auth(userOneForeverToken.token, { type: "bearer" });
        expect(res.status).to.eq(404);
      });

      describe("When an inventory has no container", () => {
        let toBeDeletedInventory: InventoryModel;
        let deletedInventoryId: number;
        let res: request.Response;

        before(async () => {
          toBeDeletedInventory = await InventoryModel.create({
            name: "plop",
            authorId: firstUser.id,
          });
          deletedInventoryId = toBeDeletedInventory.id;
        });

        it("returns 204 and deletes the inventory", async () => {
          const route = buildRouteWithParam(AllRoutes.inventoryDelete.path, {
            inventoryId: deletedInventoryId,
          });
          res = await request(app)
            .delete(route)
            .auth(userOneForeverToken.token, { type: "bearer" });

          expect(res.status).to.eq(204);

          const findInventory = await InventoryModel.findByPk(
            deletedInventoryId
          );
          expect(findInventory).to.be.null;
        });
      });

      describe("When an inventory has one container", () => {
        let toBeDeletedInventory: InventoryModel;
        let toBeDeletedContainer: InventoryContainerModel;
        let deletedInventoryId: number;
        let res: request.Response;

        before(async () => {
          toBeDeletedInventory = await InventoryModel.create({
            name: "plop",
            authorId: firstUser.id,
          });
          toBeDeletedContainer = await InventoryContainerModel.create({
            name: "plop",
            authorId: firstUser.id,
            inventoryId: toBeDeletedInventory.id,
          });

          deletedInventoryId = toBeDeletedInventory.id;
        });

        it("returns 204 and deletes the inventory", async () => {
          const route = buildRouteWithParam(AllRoutes.inventoryDelete.path, {
            inventoryId: deletedInventoryId,
          });
          res = await request(app)
            .delete(route)
            .auth(userOneForeverToken.token, { type: "bearer" });

          expect(res.status).to.eq(204);

          const findInventory = await InventoryModel.findByPk(
            deletedInventoryId
          );
          expect(findInventory).to.be.null;
        });
      });

      describe("When an inventory has one container which has one item", () => {});
    });

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
