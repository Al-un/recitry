import { expect } from "chai";
import request from "supertest";

import { AllRoutes } from "@al-un/recitry-core";
import { buildRouteWithParam } from "@al-un/recitry-core/core/base-api.utils";
import { InventoryFormData } from "@al-un/recitry-core/inventory/inventory.models";
import { userOneForeverToken } from "@al-un/recitry-core/um/access-token.mocks";

import app from "@/app";
import { testUser1 } from "@/mocha.fixtures";
import { testAuthentication } from "@/um/Auth.middleware.spec";
import { InventoryModel } from "./Inventory.model";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { testCheckInventoryAccess } from "./Inventory.middleware.spec";

describe("InventoryController", () => {
  describe("createInventory", async () => {
    const { path } = AllRoutes.inventoryCreate;
    const toCreateInventory: InventoryFormData = {
      id: null,
      name: "test/InventoryController/createInventory",
    };

    testAuthentication(request(app).post(path).send(toCreateInventory));

    it("creates inventory", async () => {
      const res = await request(app)
        .post(path)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send(toCreateInventory);

      expect(res.status).to.equal(201);

      expect(res.body).to.have.property("id").to.be.not.null;
      expect(res.body).to.have.property("name").to.eq(toCreateInventory.name);
      expect(res.body)
        .to.have.property("author")
        .to.have.property("id")
        .to.eq(testUser1.id);
    });
  });

  describe("updateInventory", async () => {});

  describe("deleteInventory", async () => {
    const testAuthRoute = buildRouteWithParam(AllRoutes.inventoryDelete.path, {
      inventoryId: 9999,
    });

    testAuthentication(request(app).delete(testAuthRoute));

    testCheckInventoryAccess(userOneForeverToken, AllRoutes.inventoryDelete);

    // it("returns 404 when inventoryId does not exist", async () => {
    //   const res = await request(app)
    //     .delete(testAuthRoute)
    //     .auth(userOneForeverToken.token, { type: "bearer" });
    //   expect(res.status).to.eq(404);
    // });

    describe("When an inventory has no container", () => {
      let toBeDeletedInventory: InventoryModel;
      let deletedInventoryId: number;
      let res: request.Response;

      before(async () => {
        toBeDeletedInventory = await InventoryModel.create({
          name: "plop",
          authorId: testUser1.id,
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

        const findInventory = await InventoryModel.findByPk(deletedInventoryId);
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
          authorId: testUser1.id,
        });
        toBeDeletedContainer = await InventoryContainerModel.create({
          name: "plop",
          authorId: testUser1.id,
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

        const findInventory = await InventoryModel.findByPk(deletedInventoryId);
        expect(findInventory).to.be.null;
      });
    });

    describe("When an inventory has one container which has one item", () => {});
  });

  describe("displayInventory", async () => {});

  describe("listInventories", async () => {});
});
