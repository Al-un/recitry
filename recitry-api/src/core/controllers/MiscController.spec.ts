import { expect } from "chai";
import request from "supertest";

import app from "@/app";

describe("MiscController", () => {
  describe("healthcheck", () => {
    it("returns OK!", async () => {
      const res = await request(app).get("/v1/health");

      expect(res.status).to.equal(200);
    });
  });
});
