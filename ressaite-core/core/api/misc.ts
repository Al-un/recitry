import type {
  EndpointType,
  NoPathParams,
  RouteOf,
} from "../../core/models/api";

export type MiscEndpointTypes = {
  health: EndpointType<"GET", NoPathParams, null, HealthResp>;
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
