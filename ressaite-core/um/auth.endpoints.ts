import { EndpointType } from "../core/base-api.endpoints";
import { PathWithNoParam } from "../core/base-api.routes";

export type AuthEndpointTypes = {
  login: EndpointType<"POST", PathWithNoParam, LoginReq, LoginSuccessfulResp>;
  logout: EndpointType<"POST", PathWithNoParam, null, null>;
  signup: EndpointType<"POST", PathWithNoParam, SignUpReq, null>;
};
// ----------------------------------------------------------------------------

interface SignUpReq {
  username: string;
  password: string;
}

interface LoginReq {
  username: string;
  password: string;
}

interface LoginSuccessfulResp {
  token: string;
}
