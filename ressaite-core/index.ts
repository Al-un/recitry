import { type MiscEndpointTypes, MiscRoutes } from "./core/api/misc";
import { type AuthEndpointTypes, AuthRoutes } from "./um/api/auth";

export type AllEndpoints = MiscEndpointTypes & AuthEndpointTypes;

export type AllEndpointsKey = keyof AllEndpoints;

export const AllRoutes = {
  ...MiscRoutes,
  ...AuthRoutes,
};
