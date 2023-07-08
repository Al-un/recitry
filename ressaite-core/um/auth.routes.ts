import type { RouteOf } from "../core/base-api.routes";
import type { AuthEndpointTypes } from "./auth.endpoints";

export const AuthRoutes: RouteOf<AuthEndpointTypes> = {
  login: {
    path: "/v1/login",
    method: "POST",
  },
  logout: {
    path: "/v1/logout",
    method: "POST",
  },
  sessionInfo: {
    path: "/v1/session-info",
    method: "GET",
  },
  signup: {
    path: "/v1/signup",
    method: "POST",
  },
};
