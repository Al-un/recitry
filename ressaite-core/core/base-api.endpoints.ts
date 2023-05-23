export type HttpMethod =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "OPTIONS";

export type EndpointType<
  method extends HttpMethod,
  PathParams extends Record<string, any> | null,
  RequestPayload extends {} | null,
  Response extends {} | null
> = {
  /** Expected HTTP endpoint for this endpoint */
  method: method;
  pathParams: PathParams;
  /** Query parameters for GET endpoints and body for other methods */
  request: RequestPayload;
  /** Response format in case of a successful response */
  response: Response;
};

export type EndpointTypes = { [key: string]: EndpointType<any, any, any, any> };

export interface WithPagination {
  page: number;
  limit: number;
}
