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
  InventoryFormData,
} from "@al-un/recitry-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { userOneInventories } from "@al-un/recitry-core/inventory/inventory.mocks";
import { testAuthentication } from "@/um/Auth.middleware.spec";
import { InventoryContainerModel } from "./InventoryContainer.model";

describe("InventoryContainerController", () => {
  let firstUser: UserModel;
  let testInventory: InventoryModel;
  let testContainerUpdate: InventoryContainerModel;
  let testContainerDelete: InventoryContainerModel;

  before(async () => {
    const userCandidate = await UserModel.findOne({
      where: { username: userOne.username },
    });
    if (userCandidate === null) throw new Error("User One not found");
    firstUser = userCandidate;

    testInventory = await InventoryModel.create({
      name: "inventory to test containers",
      authorId: firstUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("testInventory", testInventory);

    testContainerUpdate = await InventoryContainerModel.create({
      name: "container for update",
      authorId: firstUser.id,
      inventoryId: testInventory.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    testContainerDelete = await InventoryContainerModel.create({
      name: "container for delete",
      authorId: firstUser.id,
      inventoryId: testInventory.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  describe("createInventoryContainer", () => {
    let builtPath: string;
    const payload = { name: "some new container" };

    before(() => {
      console.log("testInventory", testInventory);
      const { path } = AllRoutes.inventoryContainerCreate;
      builtPath = buildRouteWithParam(path, {
        inventoryId: testInventory.id,
      });
    });

    // describe("with authentication", () => {
    //   testAuthentication(request(app).post(builtPath).send(payload));
    // });

    it("creates a container", async () => {
      const res = await request(app)
        .post(builtPath)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send(payload);

      expect(res.status).to.equal(201);
      console.log("RES.body", res.body);
      expect(res.body).to.have.property("id").to.be.not.null;
      expect(res.body)
        .to.have.property("author")
        .to.have.property("id")
        .to.eq(firstUser.id);
      expect(res.body)
        .to.have.property("inventoryId")
        .to.equal(testInventory.id);
    });
  });

  describe("updateInventoryContainer", () => {
    // const { path } = AllRoutes.inventoryContainerUpdate;
    // const builtPath = buildRouteWithParam(path, {
    //   inventoryId: testInventory.id,
    //   inventoryContainerId: testContainerUpdate.id,
    // });
    // const payload = { name: "some new container" };
    // testAuthentication(request(app).patch(builtPath).send(payload));
  });

  describe("deleteInventoryContainer", () => {
    // const { path } = AllRoutes.inventoryContainerDelete;
    // const builtPath = buildRouteWithParam(path, {
    //   inventoryId: testInventory.id,
    //   inventoryContainerId: testContainerDelete.id,
    // });
    // testAuthentication(request(app).delete(builtPath));
  });
});
