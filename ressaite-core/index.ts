import type { MiscEndpointTypes } from "./core/misc.endpoints";
import { MiscRoutes } from "./core/misc.routes";
import { InventoryEndpointTypes } from "./inventory/inventory.endpoints";
import { InventoryRoutes } from "./inventory/inventory.routes";
import type { MaterialEndpointTypes } from "./recipe/material.endpoints";
import { MaterialRoutes } from "./recipe/material.routes";
import type { RecipeEndpointTypes } from "./recipe/recipe.endpoints";
import { RecipeRoutes } from "./recipe/recipe.routes";
import type { AuthEndpointTypes } from "./um/auth.endpoints";
import { AuthRoutes } from "./um/auth.routes";

export type AllEndpoints = MiscEndpointTypes &
  InventoryEndpointTypes &
  MaterialEndpointTypes &
  RecipeEndpointTypes &
  AuthEndpointTypes;

export type AllEndpointsKey = keyof AllEndpoints;

export const AllRoutes = {
  ...MiscRoutes,
  ...InventoryRoutes,
  ...MaterialRoutes,
  ...RecipeRoutes,
  ...AuthRoutes,
};
