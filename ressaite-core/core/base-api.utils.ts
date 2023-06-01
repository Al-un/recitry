export const buildRouteWithParam = (
  routePath: string,
  pathParams?: Record<string, any>
): string => {
  let route = routePath;

  if (pathParams) {
    for (let [paramKey, paramValue] of Object.entries(pathParams)) {
      route = route.replace(`:${paramKey}`, paramValue);
    }
  }

  return route;
};
