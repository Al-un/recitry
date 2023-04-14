import { AllRoutes, type AllEndpoints, type AllEndpointsKey } from '@al-un/ressaite-core'
import { buildRouteWithParam } from '@al-un/ressaite-core/core/utils/api'

export type CallEndpointResponse<P> = { status: number; data: P }

export const callEndpoint = async <K extends AllEndpointsKey>(
  endpointKey: K,
  pathParams: AllEndpoints[K]['pathParams'],
  payload: AllEndpoints[K]['request']
): Promise<CallEndpointResponse<AllEndpoints[K]['response']>> => {
  const baseUrl = 'http://localhost:8000'

  let route = baseUrl + AllRoutes[endpointKey].path
  if (pathParams !== null) {
    route = buildRouteWithParam(route, pathParams)
  }

  const method = AllRoutes[endpointKey].method
  // @ts-ignore
  const isGet = method === 'GET'

  const body = !isGet ? JSON.stringify(payload) : null

  // @ts-ignore
  const contentType: Record<string, string> = !isGet ? { 'Content-Type': 'application/json' } : {}
  if (isGet && payload && Object.keys(payload).length) {
    const queries = Object.entries(payload)
      .map(([queryKey, queryValue]) => `${queryKey}=${JSON.stringify(queryValue)}`)
      .join('&')
    route += `?${queries}`
  }

  try {
    const response = await window.fetch(route, {
      method: method.toUpperCase(),
      body,
      headers: {
        Accept: 'application/json',
        ...contentType,
        'Access-Control-Allow-Origin': '*'
      }
    })

    const responseData = ![201, 204].includes(response.status) ? await response.json() : null

    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.warn('API call error', error)

    return { status: -1, data: null }
  }
}