import express, { Express } from "express";
import { expect } from "chai";
import request from "supertest";

import { RequestHandler } from "express";
import {isAuthenticated} from "./Auth.middleware";

let app: Express;

describe("AuthMiddleware", () => {
  const protectedGetEndPoint = "/some-protected-endpoint";

  before(() => {
    app = express();
    app.use(express.json());

    const something: RequestHandler = (_, res) => res.sendStatus(200);
    app.get(protectedGetEndPoint, isAuthenticated, something);
  });

  it("let valid token going through", async () => {
    const token = "pouet";

    const res = await request(app)
      .get(protectedGetEndPoint)
      .auth(token, { type: "bearer" });

    expect(res.status).to.equal(200);
  });

  it("returns 401 if the authentication is not valid", async () => {
    const res = await request(app)
      .get(protectedGetEndPoint)
      .auth("some invalid token", { type: "bearer" });

    expect(res.status).to.equal(401);
  });

  it("returns 401 if no token is provided", async () => {
    const res = await request(app).get(protectedGetEndPoint);

    expect(res.status).to.equal(401);
  });
});
