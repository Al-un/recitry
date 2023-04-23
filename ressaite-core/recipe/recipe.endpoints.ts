import { EndpointType, WithPagination } from "../core/base-api.endpoints";
import { PathWithNoParam } from "../core/base-api.routes";
import { PathWithUserId } from "../um/users.routes";
import { Recipe, RecipeCreation } from "./recipe.models";
import { PathWithRecipeId } from "./recipe.routes";

export type RecipeEndpointTypes = {
  recipeCreate: EndpointType<"POST", PathWithNoParam, RecipeCreation, Recipe>;
  recipeSearch: EndpointType<
    "GET",
    PathWithNoParam,
    RecipeSearchQuery,
    Recipe[]
  >;
  recipeDelete: EndpointType<"DELETE", PathWithRecipeId, null, null>;
  recipeListPerUser: EndpointType<
    "GET",
    PathWithUserId,
    WithPagination,
    Recipe[]
  >;
  recipeUpdate: EndpointType<"PUT", PathWithRecipeId, Recipe, Recipe>;
};

// ----------------------------------------------------------------------------

export interface RecipeSearchQuery extends WithPagination {
  title: string;
}
