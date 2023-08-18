import { expect } from "chai";
import request from "supertest";

import { toSupertestHttpMethod } from "@al-un/recitry-core/core/base-api.endpoints";
import { Route } from "@al-un/recitry-core/core/base-api.routes";
import { AccessToken } from "@al-un/recitry-core/um/access-token.models";

import app from "@/app";
import { buildRouteWithParam } from "@al-un/recitry-core/core/base-api.utils";
import { userTwoForeverToken } from "@al-un/recitry-core/um/access-token.mocks";
import { testInventory1_1 } from "@/mocha.fixtures";

export const testCheckInventoryAccess = (
  token: AccessToken,
  route: Route,
  routeParams?: () => Record<string, any>,
  payload?: string | object
) => {
  let builtPath: string;
  let test: request.Test;
  const method = toSupertestHttpMethod[route.method];

  describe("with inventory access", () => {
    before(() => {
      const params = routeParams ? routeParams() : { inventoryId: 0 };
      builtPath = buildRouteWithParam(route.path, params);
    });

    it("returns 404 if the inventoryId is invalid", async () => {
      const params = routeParams ? routeParams() : {};
      builtPath = buildRouteWithParam(route.path, {
        ...params,
        inventoryId: 123455,
      });

      test = request(app)
        [method](builtPath)
        .auth(token.token, { type: "bearer" });
      if (payload) {
        test = test.send(payload);
      }

      const res = await test;
      expect(res.status).to.eq(404);
    });

    it("returns 403 if the token does not have access to the inventory", async () => {
      const params = routeParams ? routeParams() : {};
      builtPath = buildRouteWithParam(route.path, {
        ...params,
        inventoryId: testInventory1_1.id,
      });

      test = request(app)
        [method](builtPath)
        .auth(userTwoForeverToken.token, { type: "bearer" });
      if (payload) {
        test = test.send(payload);
      }

      const res = await test;
      expect(res.status).to.eq(403);
    });
  });
};
