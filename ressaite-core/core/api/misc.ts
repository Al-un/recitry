import type {
  EndpointType,
  PathWithNoParam,
  RouteOf,
} from "../../core/models/api";

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
