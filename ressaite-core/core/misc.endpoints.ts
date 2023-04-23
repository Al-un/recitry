import { EndpointType } from "./base-api.endpoints";
import { PathWithNoParam } from "./base-api.routes";

export type MiscEndpointTypes = {
  health: EndpointType<"GET", PathWithNoParam, null, HealthResp>;
};

// ----------------------------------------------------------------------------

interface HealthResp {
  status: string;
}
