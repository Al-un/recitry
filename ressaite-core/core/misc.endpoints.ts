import {EndpointType} from "./base-api.endpoints"
import {PathWithNoParam, RouteOf} from "./base-api.routes"

export type MiscEndpointTypes = {
  health: EndpointType<"GET", PathWithNoParam, null, HealthResp>;
};

export const MiscRoutes: RouteOf<MiscEndpointTypes> = {
  health: {
    path: "/v1/health",
    method: "GET",
  },
};

// ----------------------------------------------------------------------------

interface HealthResp {
  status: string;
}
