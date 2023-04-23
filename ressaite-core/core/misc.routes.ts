import { RouteOf } from "./base-api.routes";
import { MiscEndpointTypes } from "./misc.endpoints";

export const MiscRoutes: RouteOf<MiscEndpointTypes> = {
  health: {
    path: "/v1/health",
    method: "GET",
  },
};
