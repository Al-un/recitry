import { expect } from "chai";
import request from "supertest";

import { userOne } from "@al-un/ressaite-core/um/users.mocks";
import { UserModel } from "@/um/User.model";

import app from "@/app";
import { MaterialModel } from "./Material.model";
import { buildRouteWithParam } from "@al-un/ressaite-core/core/base-api.utils";
import { AllRoutes } from "@al-un/ressaite-core";
import {
  userOneForeverToken,
  userTwoForeverToken,
} from "@al-un/ressaite-core/um/access-token.mocks";
import { MaterialCreation } from "@al-un/ressaite-core/recipe/material.models";
import { dumMatCarrot } from "@al-un/ressaite-core/recipe/material.mocks";
import { testAuthentication } from "@/um/Auth.middleware.spec";

describe("MaterialController", () => {
  let firstUser: UserModel;

  before(async () => {
    const userCandidate = await UserModel.findOne({
      where: { username: userOne.username },
    });
    if (userCandidate === null) throw new Error("User One not found");

    firstUser = userCandidate;
  });

  describe("searchMaterial", () => {});

  describe("createMaterial", () => {
    let creationRequest: MaterialCreation = {
      name: "plop",
      lang: "en",
    };

    testAuthentication(
      request(app).post(AllRoutes.materialCreate.path).send(creationRequest)
    );

    it("creates the material and returns 201", async () => {
      const res = await request(app)
        .post(AllRoutes.materialCreate.path)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send(creationRequest);

      expect(res.status).to.eq(201);
      const m = res.body;
      expect(m.id).to.not.be.undefined;
      expect(m.author.id).to.equal(firstUser.id);
    });

    it("cannot create a material whose name already exists and returns 400", async () => {
      const res = await request(app)
        .post(AllRoutes.materialCreate.path)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send({ name: dumMatCarrot.name, lang: "en" });

      expect(res.status).to.eq(400);
    });
  });

  describe("updateMaterial", () => {
    let someMaterial: MaterialModel;
    let route: string;

    before(async () => {
      someMaterial = await MaterialModel.create({
        name: "xyz",
        lang: "fr",
        authorId: firstUser.id,
      });
      route = buildRouteWithParam(AllRoutes.materialUpdate.path, {
        materialId: someMaterial.id,
      });
    });

    testAuthentication(
      request(app)
        .patch(
          buildRouteWithParam(AllRoutes.materialUpdate.path, {
            materialId: 1,
          })
        )
        .send({ name: "a" })
    );

    it("requires owner to perform the action", async () => {
      let res = await request(app)
        .patch(route)
        .auth(userTwoForeverToken.token, { type: "bearer" });
      expect(res.status).to.eq(403);
    });

    it("patches the material", async () => {
      let res = await request(app)
        .patch(route)
        .auth(userOneForeverToken.token, { type: "bearer" })
        .send({
          name: "abc",
        });
      expect(res.status).to.eq(200);
      expect(res.body.name).to.eq("abc");
    });
  });

  describe("deleteMaterial", () => {
    let someMaterial: MaterialModel;
    let route: string;

    before(async () => {
      someMaterial = await MaterialModel.create({
        name: "xyz",
        lang: "fr",
        authorId: firstUser.id,
      });
      route = buildRouteWithParam(AllRoutes.materialDelete.path, {
        materialId: someMaterial.id,
      });
    });

    testAuthentication(
      request(app).delete(
        buildRouteWithParam(AllRoutes.materialDelete.path, {
          materialId: 1,
        })
      )
    );

    it("requires owner to perform the action", async () => {
      let res = await request(app)
        .delete(route)
        .auth(userTwoForeverToken.token, { type: "bearer" });
      expect(res.status).to.eq(403);
    });

    it("delete the material", async () => {
      let res = await request(app)
        .delete(route)
        .auth(userOneForeverToken.token, { type: "bearer" });
      expect(res.status).to.eq(204);
    });
  });
});
