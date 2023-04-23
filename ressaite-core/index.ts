import { type MiscEndpointTypes, MiscRoutes } from "./core/misc.endpoints";
import {
  type MaterialEndpointTypes,
  MaterialRoutes,
} from "./recipe/material.endpoints";
import {
  type RecipeEndpointTypes,
  RecipeRoutes,
} from "./recipe/recipe.endpoints";
import { type AuthEndpointTypes, AuthRoutes } from "./um/auth.endpoints";

export type AllEndpoints = MiscEndpointTypes &
  MaterialEndpointTypes &
  RecipeEndpointTypes &
  AuthEndpointTypes;

export type AllEndpointsKey = keyof AllEndpoints;

export const AllRoutes = {
  ...MiscRoutes,
  ...MaterialRoutes,
  ...RecipeRoutes,
  ...AuthRoutes,
};
