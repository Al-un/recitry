import { type AuthEndpointTypes, AuthRoutes } from "./um/api/Auth";

export type AllEndpoints = AuthEndpointTypes;

export type AllEndpointsKey = keyof AllEndpoints;

export const AllRoutes = {
  ...AuthRoutes,
};
