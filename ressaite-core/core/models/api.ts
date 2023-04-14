export interface RstErrorResp {
  errorCode?: number;
  message?: string;
}

export type RstResp<ResponseFormat> = ResponseFormat | RstErrorResp;

export type HttpMethod =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "OPTIONS";

export interface Route {
  path: string;
  method: HttpMethod;
}

export type EndpointType<
  method extends HttpMethod,
  PathParams,
  RequestPayload,
  Response
> = {
  /** Expected HTTP endpoint for this endpoint */
  method: method;
  pathParams: PathParams;
  /** Query parameters for GET endpoints and body for other methods */
  request: RequestPayload;
  /** Response format in case of a successful response */
  response: Response;
};

export type NoPathParams = unknown;

export type RouteOf<
  AllEndpoints extends {
    [key: string]: EndpointType<any, any, any, any>;
  }
> = {
  [EndpointName in keyof AllEndpoints]: Route & {
    method: AllEndpoints[EndpointName]["method"];
  };
};
