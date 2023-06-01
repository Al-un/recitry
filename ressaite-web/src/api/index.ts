import { AllRoutes, type AllEndpoints, type AllEndpointsKey } from '@al-un/ressaite-core'
import { buildRouteWithParam } from '@al-un/ressaite-core/core/base-api.utils'

import { useAppStore } from '@/stores/app'

export type CallEndpointResponse<P> = { status: number; data: P }

export const callEndpoint = async <K extends AllEndpointsKey>(
  endpointKey: K,
  pathParams?: AllEndpoints[K]['pathParams'],
  payload?: AllEndpoints[K]['request']
): Promise<CallEndpointResponse<AllEndpoints[K]['response']>> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  if (!baseUrl) {
    throw new Error('VITE_API_BASE_URL not defined')
  }

  let route = baseUrl + AllRoutes[endpointKey].path
  if (pathParams !== null) {
    route = buildRouteWithParam(route, pathParams)
  }

  const method = AllRoutes[endpointKey].method.toUpperCase()
  // @ts-ignore
  const isGet = method === 'GET'

  const body = !isGet ? (payload ? JSON.stringify(payload) : undefined) : null

  // @ts-ignore
  const contentType: Record<string, string> = !isGet ? { 'Content-Type': 'application/json' } : {}
  if (isGet && payload && Object.keys(payload).length) {
    const queries = Object.entries(payload)
      .map(([queryKey, queryValue]) => `${queryKey}=${queryValue}`)
      .join('&')
    route += `?${queries}`
  }

  try {
    let headers: HeadersInit = {
      Accept: 'application/json',
      ...contentType,
      'Access-Control-Allow-Origin': '*'
    }

    const app = useAppStore()
    if (app.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${app.token}`
      }
    }

    const response = await window.fetch(route, { method, body, headers })
    const responseData = ![204].includes(response.status) ? await response.json() : null

    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.warn('API call error', error)

    return { status: -1, data: null }
  }
}
