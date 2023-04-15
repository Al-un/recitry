import { type MiscEndpointTypes, MiscRoutes } from "./core/api/Misc";
import { type AuthEndpointTypes, AuthRoutes } from "./um/api/Auth";

export type AllEndpoints = MiscEndpointTypes & AuthEndpointTypes;

export type AllEndpointsKey = keyof AllEndpoints;

export const AllRoutes = {
  ...MiscRoutes,
  ...AuthRoutes,
};
