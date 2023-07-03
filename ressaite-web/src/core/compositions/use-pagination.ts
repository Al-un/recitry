import { computed, reactive } from 'vue'

export interface PaginationState {
  currentPage: number
  limit: number
}

export interface PaginationLimit {
  totalCount: number | null
}

/**
 * Support pagination of data loading
 *
 * @param loadData the async function to load paginated data and must take
 * the pagination state as argument
 */
export const usePagination = (loadData: (pagination: PaginationState) => Promise<void>) => {
  const pagination = reactive<PaginationState>({
    currentPage: 1,
    limit: 100
  })
  const paginationLimit = reactive<PaginationLimit>({
    totalCount: null
  })

  const hasNext = computed(() => {
    if (paginationLimit.totalCount === null) return false

    const maxPage = paginationLimit.totalCount / pagination.limit + 1

    return pagination.currentPage < maxPage
  })

  const hasPrev = computed(() => {
    return pagination.currentPage > 1
  })

  async function loadPrev() {
    if (!hasPrev.value) {
      throw new Error(`Pagination ${pagination.currentPage} cannot prev`)
    }

    pagination.currentPage--
    await loadData(pagination)
  }

  async function loadNext() {
    if (!hasNext.value) {
      throw new Error(`Pagination ${pagination.currentPage} cannot next`)
    }

    pagination.currentPage++
    await loadData(pagination)
  }

  return {
    hasNext,
    hasPrev,
    loadNext,
    loadPrev,
    pagination
  }
}
