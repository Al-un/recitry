import { expect } from "chai";
import request from "supertest";

import app from "@/app";

describe("UnknownRouteMiddleware", () => {
  describe("when accessing an unregistered route", () => {
    it("returns a 404 error", async () => {
      const res = await request(app).get("/some-unknown-route");

      expect(res.status).to.equal(404);
      expect(res.body).to.have.all.keys("message");
    });
  });
});
