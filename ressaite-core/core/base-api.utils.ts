export const buildRouteWithParam = (
  routePath: string,
  pathParams?: Record<string, any>
): string => {
  let route = routePath;

  // console.log(`With route ${route}: apply`,pathParams)
  if (pathParams) {
    for (let [paramKey, paramValue] of Object.entries(pathParams)) {
      // console.log(`With route ${route}: replacing :${paramKey} with ${paramValue}`)
      if (!route.includes(`:${paramKey}`)) {
        throw new Error(`Parameter ${paramKey} not found`);
      }
      route = route.replace(`:${paramKey}`, paramValue);
    }
  }

  if (route.includes(":")) {
    throw new Error(`Route ${route} still contains parameter`);
  }

  // console.log(`Returning route ${route}`)

  return route;
};
