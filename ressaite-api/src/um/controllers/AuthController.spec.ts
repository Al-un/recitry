import { expect } from "chai";
import request from "supertest";

import app from "@/app";

describe("AuthController", () => {
  describe("login", () => {
    it("logins with proper credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "admin", password: "pouetpouet" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.all.keys("token");
    });

    it("rejects incorrect credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "admin", password: "wrong password" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.all.keys("message");
    });
  });

  describe("sign up", () => {
    it("signs new user up with proper info", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "blah", password: "pouetpouet" })
        .set("Accept", "application/json");

      expect(res.status).to.equal(201);
      expect(res.body).to.be.empty;
    });
  });
});
