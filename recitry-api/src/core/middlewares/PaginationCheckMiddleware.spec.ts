import { expect } from "chai";
import express from "express";
import request from "supertest";

import PaginationCheckMiddleware from "./PaginationCheckMiddleware";

describe("PaginationCheckMiddleware", () => {
  let app: express.Express;
  const testRoute = "/testing-pagination-check-middleware";
  const dummyHandler: express.RequestHandler = (req, res) => res.sendStatus(200);

  describe("with default configuration", () => {
    before(() => {
      app = express();
      app.get(testRoute, PaginationCheckMiddleware(), (req, res) => res.sendStatus(200));
      app.use((req) => {
        console.log(`Getting ${req.path}`);
      });
    });

    it("works when page and limit parameters are valid", async () => {
      const res = await request(app).get(`${testRoute}?page=12&limit=42`);
      expect(res.status).to.equals(200);
    });

    it("returns 400 when page is not defined", async () => {
      const res = await request(app).get(`${testRoute}`);
      expect(res.status).to.equals(400);
    });

    it("returns 400 when limit is not defined", async () => {
      const res = await request(app).get(`${testRoute}?page=123`);
      expect(res.status).to.equals(400);
    });

    it("returns 400 when page is not a strict positive number", async () => {
      const res1 = await request(app).get(`${testRoute}?page=0&limit=10`);
      expect(res1.status).to.equals(400);

      const res2 = await request(app).get(`${testRoute}?page=-1&limit=10`);
      expect(res2.status).to.equals(400);
    });

    it("returns 400 when limit is not a strict positive number", async () => {
      const res1 = await request(app).get(`${testRoute}?page=1&limit=0`);
      expect(res1.status).to.equals(400);

      const res2 = await request(app).get(`${testRoute}?page=1&limit=-1`);
      expect(res2.status).to.equals(400);
    });

    it("returns 400 when limit is greater than 50", async () => {
      const res1 = await request(app).get(`${testRoute}?page=1&limit=50`);
      expect(res1.status).to.equals(200);

      const res2 = await request(app).get(`${testRoute}?page=1&limit=51`);
      expect(res2.status).to.equals(400);
    });
  });
});
