import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  Inventory,
  InventoryContainer,
  InventoryContainerCreation,
  InventoryCreation,
  InventoryDetail,
  InventoryItem,
  InventoryItemCreation,
  InventoryListItem
} from '@al-un/ressaite-core/inventory/inventory.models'
import type { InventoryEndpointTypes } from '@al-un/ressaite-core/inventory/inventory.endpoints'
import { callEndpoint } from '@/api'

export const useInventoryStore = defineStore('inventory', () => {
  // ---------- State ---------------------------------------------------------
  const list = ref<InventoryListItem[] | null>(null)
  const current = ref<InventoryDetail | null>(null)
  const loading = ref(false)

  // ---------- Computed ------------------------------------------------------

  // ---------- Actions -------------------------------------------------------
  async function loadInventories(req: InventoryEndpointTypes['inventoryList']['pathParams']) {
    loading.value = true

    const resp = await callEndpoint('inventoryList', req)

    if (resp.status === 200) {
      list.value = resp.data.data
    }
    loading.value = false
  }

  async function loadInventoryById(inventoryId: number) {
    loading.value = true

    const resp = await callEndpoint('inventoryDisplay', { inventoryId })

    if (resp.status === 200) {
      const inventory = resp.data
      current.value = inventory

      if (list.value) {
        list.value = list.value.map((i) => (i.id === inventory.id ? inventory : i))
      } else {
        list.value = [inventory]
      }
    }
    loading.value = false
  }

  async function createInventory(newInventory: InventoryCreation) {
    loading.value = true

    const resp = await callEndpoint('inventoryCreate', null, newInventory)
    console.log('resp', resp)
    if (resp.status === 201) {
      const createdInventory = resp.data
      list.value = [...(list.value || []), createdInventory]
    }

    loading.value = false
  }

  async function updateInventory(inventory: Inventory) {
    loading.value = true

    const resp = await callEndpoint('inventoryUpdate', { inventoryId: inventory.id }, inventory)
    if (resp.status === 200) {
      const updatedInventory = resp.data

      if (list.value) {
        list.value = list.value.map((i) => (i.id === inventory.id ? updatedInventory : i))
      } else {
        list.value = [updatedInventory]
      }
    }

    loading.value = false
  }

  async function deleteInventory(inventoryId: number) {
    loading.value = true

    const resp = await callEndpoint('inventoryDelete', { inventoryId })
    if (resp.status === 204) {
      if (list.value) {
        list.value = list.value.filter((i) => i.id !== inventoryId)
      }
    }

    loading.value = false
  }

  async function createInventoryContainer(
    inventoryId: number,
    container: InventoryContainerCreation
  ) {
    loading.value = true

    const resp = await callEndpoint('inventoryContainerCreate', { inventoryId }, container)
    console.log("RESP", resp)
    console.log("current", current)
    if (resp.status === 201) {
      const createdContainer = resp.data

      if (current.value) {
        current.value.containers.push({ ...createdContainer, items: [] })
      }
    }
    console.log("current", current)

    loading.value = false
  }

  async function updateInventoryContainer(inventoryId: number, container: InventoryContainer) {
    loading.value = true

    const resp = await callEndpoint(
      'inventoryContainerUpdate',
      {
        inventoryId,
        inventoryContainerId: container.id
      },
      container
    )
    if (resp.status === 200) {
      const updatedContainer = resp.data

      if (current.value) {
        current.value = {
          ...current.value,
          containers: current.value.containers.map((c) => {
            if (c.id !== container.id) return c

            return {
              ...updatedContainer,
              items: c.items
            }
          })
        }
      }
    }

    loading.value = false
  }

  async function deleteInventoryContainer(inventoryId: number, containerId: number) {
    loading.value = true

    const resp = await callEndpoint('inventoryContainerDelete', {
      inventoryId,
      inventoryContainerId: containerId
    })
    console.log('RESP', resp)
    if (resp.status === 204) {
      if (current.value) {
        console.log('CONTAINER', current.value)
        current.value = {
          ...current.value,
          containers: current.value.containers.filter((c) => c.id !== containerId)
        }
        console.log('CONTAINER', current.value)
      }
    }

    loading.value = false
  }

  async function createInventoryItem(
    inventoryId: number,
    inventoryContainerId: number,
    item: InventoryItemCreation
  ) {
    loading.value = true

    const resp = await callEndpoint(
      'inventoryItemCreate',
      { inventoryId, inventoryContainerId },
      item
    )
    if (resp.status === 201) {
      const createdItem = resp.data

      if (current.value) {
        const container = current.value.containers.find((c) => c.id === inventoryContainerId)
        if (container) {
          container.items.push(createdItem)
        }
        // current.value = {
        //   ...current.value,
        //   containers: current.value.containers.map((c) => {
        //     if (c.id !== inventoryContainerId) return c

        //     return {
        //       ...c,
        //       items: [...c.items, createdItem]
        //     }
        //   })
        // }
      }
    }

    loading.value = false
  }

  async function updateInventoryItem(
    inventoryId: number,
    inventoryContainerId: number,
    item: InventoryItem
  ) {
    loading.value = true

    const resp = await callEndpoint(
      'inventoryItemUpdate',
      { inventoryId, inventoryContainerId, inventoryItemId: item.id },
      item
    )
    if (resp.status === 200) {
      const updatedItem = resp.data

      if (current.value) {
        current.value = {
          ...current.value,
          containers: current.value.containers.map((c) => {
            if (c.id !== inventoryContainerId) return c

            return {
              ...c,
              items: c.items.map((i) => (i.id === updatedItem.id ? updatedItem : i))
            }
          })
        }
      }
    }

    loading.value = false
  }

  async function deleteInventoryItem(inventoryId: number, containerId: number, itemId: number) {
    loading.value = true

    const resp = await callEndpoint('inventoryItemDelete', {
      inventoryId,
      inventoryContainerId: containerId,
      inventoryItemId: itemId
    })
    if (resp.status === 204) {
      if (current.value) {
        current.value = {
          ...current.value,
          containers: current.value.containers.map((c) => {
            return c.id !== containerId
              ? c
              : {
                  ...c,
                  items: c.items.filter((item) => item.id !== itemId)
                }
          })
        }
      }
    }

    loading.value = false
  }
  // --------------------------------------------------------------------------
  return {
    current,
    list,
    loading,
    loadInventories,
    loadInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
    createInventoryContainer,
    updateInventoryContainer,
    deleteInventoryContainer,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  }
})
