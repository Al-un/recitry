import { type MiscEndpointTypes } from "./core/misc.endpoints";
import { MiscRoutes } from "./core/misc.routes";
import { type MaterialEndpointTypes } from "./recipe/material.endpoints";
import { MaterialRoutes } from "./recipe/material.routes";
import { type RecipeEndpointTypes } from "./recipe/recipe.endpoints";
import { RecipeRoutes } from "./recipe/recipe.routes";
import { type AuthEndpointTypes } from "./um/auth.endpoints";
import { AuthRoutes } from "./um/auth.routes";

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
