import { expect } from "chai";
import request from "supertest";

import { userOne } from "@al-un/recitry-core/um/users.mocks";
import { UserModel } from "@/um/User.model";

import app from "@/app";
import { MaterialModel } from "./Material.model";
import { buildRouteWithParam } from "@al-un/recitry-core/core/base-api.utils";
import { AllRoutes } from "@al-un/recitry-core";
import {
  userOneForeverToken,
  userTwoForeverToken,
} from "@al-un/recitry-core/um/access-token.mocks";
import { MaterialFormData } from "@al-un/recitry-core/recipe/material.models";
import { dumMatCarrot } from "@al-un/recitry-core/recipe/material.mocks";
import { testAuthentication } from "@/um/Auth.middleware.spec";

describe("MaterialController", () => {
  let firstUser: UserModel;
  let authorId: number;

  before(async () => {
    const userCandidate = await UserModel.findOne({
      where: { username: userOne.username },
    });
    if (userCandidate === null) throw new Error("User One not found");

    firstUser = userCandidate;
    authorId = firstUser.id;
  });

  describe("searchMaterial", () => {
    const { path } = AllRoutes.materialSearch;
    const name = "xyz";
    const limit = 4;

    before(async () => {
      // Expect to not have dummy material with xyz name
      await MaterialModel.create({ name: "bla-xyz01", lang: "fr", authorId });
      await MaterialModel.create({ name: "bla-XYZ02", lang: "en", authorId });
      await MaterialModel.create({ name: "bla-xYz03", lang: "en", authorId });
      await MaterialModel.create({ name: "bla-xyz-04", lang: "fr", authorId });
      await MaterialModel.create({ name: "bla-xyz-05", lang: "en", authorId });
      await MaterialModel.create({ name: "bla-xyz-06", lang: "fr", authorId });
      await MaterialModel.create({ name: "bla-xyz-07", lang: "fr", authorId });
    });

    // describe("when fetching the first page", () => {
    //   let res: request.Response;
    //   before(async () => {
    //     const params = { page: 1, limit, name };
    //     const route = buildRouteWithParam(path, params);
    //     res = await request(app).get(route);
    //   });

    //   it("returns the first four materials", () => {
    //     const body = res.body;
    //     expect(body.data.length).to.eq(4);
    //   });

    //   it("returns the total count", () => {
    //     const body = res.body;
    //     expect(body.totalCount).to.eq(7);
    //   });
    // });

    // describe("when fetching the second page", () => {
    //   let res: request.Response;
    //   before(async () => {
    //     const params = { page: 2, limit, name };
    //     const route = buildRouteWithParam(path, params);
    //     res = await request(app).get(route);
    //   });

    //   it("returns the three next materials", () => {
    //     const body = res.body;
    //     expect(body.data.length).to.eq(3);
    //   });
    // });

    // describe("when fetching the third page", () => {
    //   let res: request.Response;
    //   before(async () => {
    //     const params = { page: 3, limit, name };
    //     const route = buildRouteWithParam(path, params);
    //     res = await request(app).get(route);
    //   });

    //   it("returns nothing", () => {
    //     const body = res.body;
    //     expect(body.data.length).to.eq(0);
    //   });
    // });
  });

  describe("createMaterial", () => {
    let creationRequest: MaterialFormData = {
      id: null,
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
    const { path } = AllRoutes.materialUpdate;
    let someMaterial: MaterialModel;
    let route: string;

    before(async () => {
      someMaterial = await MaterialModel.create({
        name: "xyz",
        lang: "fr",
        authorId,
      });
      route = buildRouteWithParam(path, { materialId: someMaterial.id });
    });

    testAuthentication(
      request(app)
        .patch(buildRouteWithParam(path, { materialId: 1 }))
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
    const { path } = AllRoutes.materialDelete;
    let toDeleteMaterial: MaterialModel;
    let route: string = buildRouteWithParam(path, { materialId: 999 });
    let res;

    before(async () => {
      toDeleteMaterial = await MaterialModel.create({
        name: "xyz-to-be-deleted-and-stuff",
        lang: "fr",
        authorId,
      });
      route = buildRouteWithParam(path, { materialId: toDeleteMaterial.id });
    });

    testAuthentication(request(app).delete(route));

    describe("when the actor is not the owner", () => {
      it("returns a 403 error", async () => {
        res = await request(app)
          .delete(route)
          .auth(userTwoForeverToken.token, { type: "bearer" });

        expect(res.status).to.eq(403);
      });
    });

    describe("when the actor is the owner", () => {
      it("delete the material if it exists", async () => {
        res = await request(app)
          .delete(route)
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.eq(204);
      });

      it("returns 404 if it does not exists", async () => {
        res = await request(app)
          .delete(buildRouteWithParam(path, { materialId: 99999 }))
          .auth(userOneForeverToken.token, { type: "bearer" });

        expect(res.status).to.eq(404);
      });
    });
  });
});
