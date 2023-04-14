import { EndpointType, NoPathParams, RouteOf } from "../../core/models/api";

export type AuthEndpointTypes = {
  login: EndpointType<"POST", NoPathParams, LoginReq, LoginSuccessfulResp>;
  logout: EndpointType<"POST", NoPathParams, unknown, null>;
  signup: EndpointType<"POST", NoPathParams, SignUpReq, null>;
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
