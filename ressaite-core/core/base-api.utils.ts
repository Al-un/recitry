export const buildRouteWithParam = (
  routePath: string,
  pathParams?: Record<string, any>
): string => {
  let route = routePath;

  console.log(`With route ${route}: apply`,pathParams)
  if (pathParams) {
    for (let [paramKey, paramValue] of Object.entries(pathParams)) {
      console.log(`With route ${route}: replacing :${paramKey} with ${paramValue}`)
      route = route.replace(`:${paramKey}`, paramValue);
    }
  }

  console.log(`Returning route ${route}`)

  return route;
};
