import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Inventory } from '@al-un/ressaite-core/inventory/inventory.models'
import { userOneInventories } from '@al-un/ressaite-core/inventory/inventory.mocks'
import type { InventoryEndpointTypes } from '@al-un/ressaite-core/inventory/inventory.endpoints'
import type { PaginatedResp } from '@al-un/ressaite-core/core/base-api.models'

export const useInventoryStore = defineStore('inventory', () => {
  // ---------- State ---------------------------------------------------------
  const list = ref<Inventory[] | null>(null)
  const current = ref<Inventory | null>(null)
  const loading = ref(false)

  // ---------- Computed ------------------------------------------------------

  // ---------- Actions -------------------------------------------------------
  async function loadInventories(req: InventoryEndpointTypes['inventoryList']['pathParams']) {
    loading.value = true

    const resp = await new Promise<PaginatedResp<Inventory[]>>((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: userOneInventories.inventories,
            totalCount: userOneInventories.inventories.length
          }),
        1500
      )
    )
    loading.value = false
    list.value = resp.data
  }

  async function loadInventoryById(id: number) {
    loading.value = true

    await loadInventories({ limit: 0, page: 0 })
    loading.value = false
    current.value = (list.value || []).find((i: Inventory) => i.id === id) || null
  }

  // --------------------------------------------------------------------------
  return {
    current,
    list,
    loading,
    loadInventories,
    loadInventoryById
  }
})
