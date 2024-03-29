import { expect } from "chai";
import request from "supertest";

import { AllRoutes } from "@al-un/recitry-core/";
import app from "@/app";
import { AccessTokenModel } from "./AccessToken.model";
import { userOne } from "@al-un/recitry-core/um/users.mocks";

describe("AuthController", () => {
  describe("login", () => {
    it("logins with proper credentials", async () => {
      const res = await request(app).post(AllRoutes.login.path).send({
        email: userOne.email,
        password: userOne.clearPassword,
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.all.keys("token");
    });

    it("rejects incorrect credentials", async () => {
      const res = await request(app).post(AllRoutes.login.path).send({
        email: userOne.email,
        password: "wrong password",
      });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.all.keys("message");
    });
  });

  describe("logout", () => {
    let token: string;

    before(async () => {
      // from v1/login test
      const res = await request(app)
        .post(AllRoutes.login.path)
        .send({ email: userOne.email, password: userOne.clearPassword });

      token = res.body.token;
    });

    it("expires the currently valid token", async () => {
      const beforeLogoutToken = await AccessTokenModel.findOne({ where: { token } });
      expect(beforeLogoutToken?.expiresAt).is.greaterThan(new Date());

      const res = await request(app)
        .post(AllRoutes.logout.path)
        // https://stackoverflow.com/a/71992321/4906586
        .auth(token, { type: "bearer" });

      expect(res.status).to.equal(204);
      expect(res.body).to.be.empty;

      const afterLogoutToken = await AccessTokenModel.findOne({ where: { token } });
      expect(afterLogoutToken?.expiresAt).is.lessThan(new Date());
    });
  });

  describe("sign up", () => {
    let signUpResponse: request.Response;

    const signedUpUser = { email: "blah", password: "pouicpouic" };

    before(async () => {
      signUpResponse = await request(app)
        .post(AllRoutes.signup.path)
        .send(signedUpUser)
        .set("Accept", "application/json");
    });

    it("signs new user up with proper info", () => {
      expect(signUpResponse.status).to.equal(201);
      expect(signUpResponse.body).to.be.empty;
    });

    it("lets the new user to login", async () => {
      const res = await request(app)
        .post(AllRoutes.login.path)
        .send(signedUpUser);

      expect(res.status).to.equal(200);
    });

    it("does not allow another user to signup with the same email", async () => {
      const res = await request(app)
        .post(AllRoutes.signup.path)
        .send({ email: signedUpUser.email, password: "another-password" })
        .set("Accept", "application/json");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.all.keys("message");
    });
  });
});
