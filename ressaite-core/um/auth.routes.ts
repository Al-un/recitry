import { RouteOf } from "../core/base-api.routes";
import { AuthEndpointTypes } from "./auth.endpoints";

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
