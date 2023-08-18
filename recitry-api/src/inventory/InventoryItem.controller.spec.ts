import { expect } from "chai";
import request from "supertest";

import { AllRoutes } from "@al-un/recitry-core";
import { buildRouteWithParam } from "@al-un/recitry-core/core/base-api.utils";
import { userOneForeverToken } from "@al-un/recitry-core/um/access-token.mocks";

import app from "@/app";
import { UserModel } from "@/um/User.model";
import { userOne } from "@al-un/recitry-core/um/users.mocks";
import { InventoryFormData } from "@al-un/recitry-core/inventory/inventory.models";
import { InventoryModel } from "./Inventory.model";
import { testAuthentication } from "@/um/Auth.middleware.spec";
import { InventoryContainerModel } from "./InventoryContainer.model";

describe("InventoryItemController", () => {
  describe.skip("createInventoryItem", () => {
    it('returns "not implemented yet" error', async () => {
      const res = await request(app)
        .post(AllRoutes.inventoryContainerCreate.path)
        .auth(userOneForeverToken.token, { type: "bearer" });

      expect(res.status).to.equal(503);
      expect(res.body.message).to.equal("not implemented yet");
    });
  });

  describe.skip("updateInventoryItem", () => {
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

  describe.skip("deleteInventoryItem", () => {
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
