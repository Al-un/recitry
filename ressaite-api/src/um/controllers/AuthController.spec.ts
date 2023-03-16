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
    let signUpResponse: request.Response;
    before(async () => {
      signUpResponse = await request(app)
        .post("/signup")
        .send({ username: "blah", password: "pouicpouic" })
        .set("Accept", "application/json");
    });

    it("signs new user up with proper info", () => {
      expect(signUpResponse.status).to.equal(201);
      expect(signUpResponse.body).to.be.empty;
    });

    it("lets the new user to login", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "blah", password: "pouicpouic" });

      expect(res.status).to.equal(200);
    });

    it("does not allow another user to signup with the same username", async () => {
      const res = await request(app)
        .post("/signup")
        .send({ username: "blah", password: "another-password" })
        .set("Accept", "application/json");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.all.keys("message");
    });
  });
});
