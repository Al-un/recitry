import type { WithPagination } from '@al-un/ressaite-core/core/base-api.endpoints'
import type { PaginatedResp } from '@al-un/ressaite-core/core/base-api.models'
import { computed, reactive } from 'vue'
import type { CallEndpointResponse } from '../api'

export interface PaginationState {
  currentPage: number
  limit: number
  totalCount: number | null
}

/**
 * Support pagination of data loading
 *
 * @param loadData the async function to load paginated data and must take
 * the pagination state as argument
 */
export const usePagination = <Entity>(
  fetchDataFn: (
    pagination: WithPagination
  ) => Promise<CallEndpointResponse<PaginatedResp<Entity[]>>>
) => {
  const paginationState = reactive<PaginationState>({
    currentPage: 1,
    limit: 100,
    totalCount: null
  })

  const lastPage = computed(() => {
    if (paginationState.totalCount === null) return -1

    const last = Math.ceil(paginationState.totalCount / paginationState.limit)
    return last
  })

  const hasNext = computed(() => {
    if (paginationState.totalCount === null) return false

    return paginationState.currentPage < lastPage.value
  })

  const hasPrev = computed(() => {
    return paginationState.currentPage > 1
  })

  async function loadData() {
    const resp = await fetchDataFn({
      page: paginationState.currentPage,
      limit: paginationState.limit
    })

    paginationState.totalCount = resp.data.totalCount
  }

  async function loadPrev() {
    if (!hasPrev.value) {
      throw new Error(`Pagination ${paginationState.currentPage} cannot prev`)
    }

    paginationState.currentPage--
    await loadData()
  }

  async function loadNext() {
    if (!hasNext.value) {
      throw new Error(`Pagination ${paginationState.currentPage} cannot next`)
    }

    paginationState.currentPage++
    await loadData()
  }

  return {
    hasNext,
    hasPrev,
    lastPage,
    loadData,
    loadNext,
    loadPrev,
    paginationState
  }
}
