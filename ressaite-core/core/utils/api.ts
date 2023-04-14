export const buildRouteWithParam = (
  routePath: string,
  pathParams: Record<string, any>
): string => {
  let route = routePath;

  for (let [paramKey, paramValue] of Object.entries(pathParams)) {
    route.replace(`:${paramKey}`, paramValue);
  }

  return route;
};
