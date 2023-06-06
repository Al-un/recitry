import type { EndpointType } from "../core/base-api.endpoints";
import type { PathWithNoParam } from "../core/base-api.routes";

export type AuthEndpointTypes = {
  login: EndpointType<"POST", PathWithNoParam, LoginReq, LoginSuccessfulResp>;
  logout: EndpointType<"POST", PathWithNoParam, null, null>;
  signup: EndpointType<"POST", PathWithNoParam, SignUpReq, null>;
};
// ----------------------------------------------------------------------------

interface SignUpReq {
  email: string;
  password: string;
}

interface LoginReq {
  email: string;
  password: string;
}

interface LoginSuccessfulResp {
  token: string;
}
