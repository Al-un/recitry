import { EndpointType, WithPagination } from "../core/base-api.endpoints";
import { PathWithNoParam, RouteOf } from "../core/base-api.routes";
import { PathWithUserId } from "../um/users.routes";
import { Recipe, RecipeCreation } from "./recipe.models";

export type RecipeEndpointTypes = {
  recipeCreate: EndpointType<"POST", PathWithNoParam, RecipeCreation, Recipe>;
  recipeDelete: EndpointType<"DELETE", PathWithRecipeId, null, null>;
  recipeListPerUser: EndpointType<
    "GET",
    PathWithUserId,
    WithPagination,
    Recipe[]
  >;
  recipeUpdate: EndpointType<"PUT", PathWithRecipeId, Recipe, Recipe>;
};

export const RecipeRoutes: RouteOf<RecipeEndpointTypes> = {
  recipeCreate: {
    path: "/v1/recipes/",
    method: "POST",
  },
  recipeDelete: {
    path: "/v1/recipe/:recipeId",
    method: "DELETE",
  },
  recipeListPerUser: {
    path: "/v1/user/:userId/recipes",
    method: "GET",
  },
  recipeUpdate: {
    path: "/v1/recipe/:recipeId",
    method: "PUT",
  },
};

// ----------------------------------------------------------------------------

export interface PathWithRecipeId {
  recipeId: number;
}

// ----------------------------------------------------------------------------
