import { expect } from "chai";
import request from "supertest";

import { AllRoutes } from "@al-un/recitry-core";
import { buildRouteWithParam } from "@al-un/recitry-core/core/base-api.utils";
import { userOneForeverToken } from "@al-un/recitry-core/um/access-token.mocks";

import app from "@/app";
import { UserModel } from "@/um/User.model";
import { userOne } from "@al-un/recitry-core/um/users.mocks";
import {
  InventoryContainer,
  InventoryContainerFormData,
  InventoryFormData,
} from "@al-un/recitry-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { testAuthentication } from "@/um/Auth.middleware.spec";
import { InventoryContainerModel } from "./InventoryContainer.model";
import { testUser1 } from "@/mocha.fixtures";

describe("InventoryContainerController", () => {
  let testInventory: InventoryModel;
  let testContainerUpdate: InventoryContainerModel;
  let testContainerDelete: InventoryContainerModel;

  before(async () => {
    testInventory = await InventoryModel.create({
      name: "test/inventory to test containers",
      authorId: testUser1.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("testInventory", testInventory);

    testContainerUpdate = await InventoryContainerModel.create({
      name: "test/container for update",
      authorId: testUser1.id,
      inventoryId: testInventory.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    testContainerDelete = await InventoryContainerModel.create({
      name: "test/container for delete",
      authorId: testUser1.id,
      inventoryId: testInventory.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  describe("createInventoryContainer", () => {
    const { path } = AllRoutes.inventoryContainerCreate;
    let builtPath: string;
    let payload: InventoryContainerFormData = {
      id: null,
      name: "test/InventoryContainerController/createInventoryContainer",
      inventoryId: 1,
    };

    before(() => {
      builtPath = buildRouteWithParam(path, { inventoryId: testInventory.id });
      payload.inventoryId = testInventory.id;
    });

    testAuthentication(
      request(app)
        .post(buildRouteWithParam(path, { inventoryId: 1 }))
        .send(payload)
    );

    it("creates a container", async () => {
      const res = await request(app)
        .post(builtPath)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send(payload);

      expect(res.status).to.equal(201);

      expect(res.body).to.have.property("id").to.be.not.null;
      expect(res.body).to.have.property("name").to.eq(payload.name);
      expect(res.body)
        .to.have.property("author")
        .to.have.property("id")
        .to.eq(testUser1.id);
      expect(res.body)
        .to.have.property("inventoryId")
        .to.equal(testInventory.id);
    });
  });

  describe("updateInventoryContainer", () => {
    const { path } = AllRoutes.inventoryContainerUpdate;
    let builtPath: string;
    let payload: InventoryContainerFormData = {
      id: null,
      name: "test/InventoryContainerController/updateInventoryContainer",
      inventoryId: 1,
    };

    before(() => {
      builtPath = buildRouteWithParam(path, {
        inventoryId: testInventory.id,
        inventoryContainerId: testContainerUpdate.id,
      });
      payload.inventoryId = testInventory.id;
    });

    testAuthentication(
      request(app)
        .patch(
          buildRouteWithParam(path, { inventoryId: 1, inventoryContainerId: 1 })
        )
        .send(payload)
    );

    it("updates a container and ignore irrelevant fields", async () => {
      const res = await request(app)
        .patch(builtPath)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send({ ...payload, id: 0, authorId: 0, inventoryId: 0 });

      expect(res.status).to.equal(200);

      // Test changed fields
      expect(res.body).to.have.property("name").to.eq(payload.name);

      // Test ignored fields
      expect(res.body).to.have.property("id").to.eq(testContainerUpdate.id);
      expect(res.body)
        .to.have.property("author")
        .to.have.property("id")
        .to.eq(testUser1.id);
      expect(res.body)
        .to.have.property("inventoryId")
        .to.equal(testInventory.id);
    });
  });

  describe("deleteInventoryContainer", () => {
    const { path } = AllRoutes.inventoryContainerDelete;
    let builtPath: string;

    before(() => {
      builtPath = buildRouteWithParam(path, {
        inventoryId: testInventory.id,
        inventoryContainerId: testContainerUpdate.id,
      });
    });

    testAuthentication(
      request(app).delete(
        buildRouteWithParam(path, { inventoryId: 1, inventoryContainerId: 1 })
      )
    );

    it("deletes a container", async () => {
      const res = await request(app)
        .delete(builtPath)
        .auth(userOneForeverToken.token, { type: "bearer" });

      expect(res.status).to.equal(204);
    });
  });
});
