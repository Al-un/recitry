export const buildRouteWithParam = (
  routePath: string,
  pathParams?: Record<string, any>,
  debug: boolean = false
): string => {
  let route = routePath;

  if (debug) console.log(`Route ${route}: apply`, pathParams);
  if (pathParams) {
    for (let [paramKey, paramValue] of Object.entries(pathParams)) {
      if (debug) {
        console.log(
          `Route ${route}: replacing :${paramKey} with ${paramValue}`
        );
      }
      if (!route.includes(`:${paramKey}`)) {
        throw new Error(`Parameter ${paramKey} not found in ${route}`);
      }
      route = route.replace(`:${paramKey}`, paramValue);
    }
  }

  if (debug) console.log(`Route ${route} returned`);

  const routeWithoutHttp = route.replace(/[http|https]:\/\//, "");
  const routeWithoutPort = routeWithoutHttp.replace(/:[0-9]{4}/, "");
  if (routeWithoutPort.includes(":")) {
    throw new Error(`Route ${route} still contains parameter`);
  }

  return route;
};
