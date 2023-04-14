import { RequestHandler, Router } from "express";
import type { ParsedQs } from "qs";

import {
  EndpointType,
  EndpointTypes,
  Route,
  RstResp,
} from "@al-un/ressaite-core/core/models/api";

export type ExpressController<AllEndpoints extends EndpointTypes> = {
  [EndpointName in keyof AllEndpoints]: AllEndpoints[EndpointName]["method"] extends "GET"
    ? RequestHandler<
        AllEndpoints[EndpointName]["pathParams"],
        RstResp<AllEndpoints[EndpointName]["response"]>,
        unknown,
        AllEndpoints[EndpointName]["request"],
        Record<string, number>
      >
    : RequestHandler<
        AllEndpoints[EndpointName]["pathParams"],
        RstResp<AllEndpoints[EndpointName]["response"]>,
        AllEndpoints[EndpointName]["request"],
        ParsedQs,
        Record<string, number>
      >;
};

export type ExpressRouterConfig<AllEndpoints extends EndpointTypes> = {
  [EndpointName in keyof AllEndpoints]: {
    route: Route;
    controller: ExpressController<AllEndpoints>[EndpointName];
    middlewares?: Array<RequestHandler<any, any, any, any, any>>;
  };
};

export const loadRouterConfig = <AllEndpoints extends EndpointTypes>(
  config: ExpressRouterConfig<AllEndpoints>,
  router?: Router
) => {
  const loadedRouter = router || Router();

  for (let routeKey in config) {
    const routeConfig = config[routeKey];

    const handlers = [
      ...(routeConfig.middlewares || []),
      routeConfig.controller,
    ];

    switch (routeConfig.route.method) {
      case "GET":
        loadedRouter.get(routeConfig.route.path, handlers);
        break;
      case "POST":
        loadedRouter.post(routeConfig.route.path, handlers);
        break;
      case "PATCH":
        loadedRouter.patch(routeConfig.route.path, handlers);
        break;
      case "PUT":
        loadedRouter.put(routeConfig.route.path, handlers);
        break;
      case "DELETE":
        loadedRouter.delete(routeConfig.route.path, handlers);
        break;
    }
  }

  return loadedRouter;
};
