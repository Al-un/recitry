import type { EndpointType } from "./base-api.endpoints";
import type { PathWithNoParam } from "./base-api.routes";

export type MiscEndpointTypes = {
  health: EndpointType<"GET", PathWithNoParam, null, HealthResp>;
};

// ----------------------------------------------------------------------------

interface HealthResp {
  status: string;
}
