import type { RouteOf } from "./base-api.routes";
import type { MiscEndpointTypes } from "./misc.endpoints";

export const MiscRoutes: RouteOf<MiscEndpointTypes> = {
  health: {
    path: "/v1/health",
    method: "GET",
  },
};
