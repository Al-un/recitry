import { RouteOf } from "../core/base-api.routes";
import { RecipeEndpointTypes } from "./recipe.endpoints";

export const RecipeRoutes: RouteOf<RecipeEndpointTypes> = {
  recipeCreate: {
    path: "/v1/recipes/",
    method: "POST",
  },
  recipeSearch: {
    path: "/v1/recipes/",
    method: "GET",
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
