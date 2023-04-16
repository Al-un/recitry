import type { EndpointType, PathWithNoParam, RouteOf } from "../../core/models/api";

export type AuthEndpointTypes = {
  login: EndpointType<"POST", PathWithNoParam, LoginReq, LoginSuccessfulResp>;
  logout: EndpointType<"POST", PathWithNoParam, null, null>;
  signup: EndpointType<"POST", PathWithNoParam, SignUpReq, null>;
};

export const AuthRoutes: RouteOf<AuthEndpointTypes> = {
  login: {
    path: "/v1/login",
    method: "POST",
  },
  logout: {
    path: "/v1/logout",
    method: "POST",
  },
  signup: {
    path: "/v1/signup",
    method: "POST",
  },
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
