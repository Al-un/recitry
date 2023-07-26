import { expect } from "chai";
import { buildRouteWithParam } from "./base-api.utils";

describe("base-api.utils", () => {
  describe("buildRouteWithParam", () => {
    it("replaces the parameters", () => {
      const route = "/v1/entity/:entityId/:someKey";
      const params = { entityId: 1234, someKey: 5678 };

      const builtRoute = buildRouteWithParam(route, params);
      expect(builtRoute).to.eq("/v1/entity/1234/5678");
    });

    it("has no effect on route without parameters", () => {
      expect(buildRouteWithParam("abcd")).to.eq("abcd");
    });

    it("throws an error if a parameter is not used", () => {
      const route = "/v1/entity/:entityId";
      const params = { entityId: 1234, someKey: 5678 };

      const fn = () => buildRouteWithParam(route, params);
      expect(fn).to.throw(Error, /not found/);
    });

    it("throws an error if a parameter remains not replaced", () => {
      const route = "/v1/entity/:entityId/:someMissingKey";
      const params = { entityId: 1234 };

      const fn = () => buildRouteWithParam(route, params);
      expect(fn).to.throw(Error, /still contains/);
    });
  });
});
