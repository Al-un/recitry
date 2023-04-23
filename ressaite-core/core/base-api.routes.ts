import { EndpointTypes, HttpMethod } from "./base-api.endpoints";

export interface Route {
  path: string;
  method: HttpMethod;
}

export type RouteOf<AllEndpoints extends EndpointTypes> = {
  [EndpointName in keyof AllEndpoints]: Route & {
    method: AllEndpoints[EndpointName]["method"];
  };
};

export type PathWithNoParam = null;
