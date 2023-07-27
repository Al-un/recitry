import { computed, reactive, type ComputedRef } from 'vue'
import type { WithPagination } from '@al-un/recitry-core/core/base-api.endpoints'
import type { PaginatedResp } from '@al-un/recitry-core/core/base-api.models'
import type { CallEndpointResponse } from '../api'

export interface PaginationState<EntityList> {
  currentPage: number
  limit: number
  list: EntityList
  totalCount: number | null
}

export interface UsePaginationOptions {
  limit?: number
}

export interface PaginationComposition<Entity> {
  state: PaginationState<Entity[]>
  lastPage: ComputedRef<number>
  hasNext: ComputedRef<boolean>
  hasPrev: ComputedRef<boolean>
  addToList: (entity: Entity, addAtBeginningOfList?: boolean) => void
  loadData: () => Promise<void>
  loadNext: () => Promise<void>
  loadPrev: () => Promise<void>
  removeFromList: (entity: Entity) => void
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
  ) => Promise<CallEndpointResponse<PaginatedResp<Entity[]>>>,
  options: UsePaginationOptions = {}
): PaginationComposition<Entity> => {
  const state: PaginationState<Entity[]> = reactive({
    currentPage: 1,
    limit: options.limit || 100,
    list: [],
    totalCount: null
  })

  // --------------------------------------------------------------------------

  const lastPage = computed(() => {
    if (state.totalCount === null) return -1

    const last = Math.ceil(state.totalCount / state.limit)
    return last
  })

  const hasNext = computed(() => {
    if (state.totalCount === null) return false

    return state.currentPage < lastPage.value
  })

  const hasPrev = computed(() => {
    return state.currentPage > 1
  })

  // --------------------------------------------------------------------------

  function addToList(entity: Entity, addAtBeginningOfList: boolean = true) {
    if (addAtBeginningOfList) {
      state.list.unshift(entity)
    } else {
      state.list.push(entity)
    }
    state.list = state.list.slice(0, state.limit)

    if (state.totalCount) state.totalCount++
  }

  function removeFromList(entity: Entity) {
    /** @todo: handle equality check */
    // @ts-ignore
    state.list = state.list.filter((e) => e.id !== entity.id)

    if (state.totalCount) state.totalCount--
  }

  async function loadData() {
    const resp = await fetchDataFn({
      page: state.currentPage,
      limit: state.limit
    })

    state.list = resp.data.data
    state.totalCount = resp.data.totalCount
  }

  async function loadPrev() {
    if (!hasPrev.value) {
      throw new Error(`Pagination ${state.currentPage} cannot prev`)
    }

    state.currentPage--
    await loadData()
  }

  async function loadNext() {
    if (!hasNext.value) {
      throw new Error(`Pagination ${state.currentPage} cannot next`)
    }

    state.currentPage++
    await loadData()
  }

  // --------------------------------------------------------------------------

  return {
    addToList,
    hasNext,
    hasPrev,
    lastPage,
    loadData,
    loadNext,
    loadPrev,
    removeFromList,
    state
  }
}
