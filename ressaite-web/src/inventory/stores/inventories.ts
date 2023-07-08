import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import type {
  InventoryContainer,
  InventoryContainerFormData,
  InventoryFormData,
  InventoryDetail,
  InventoryItemFormData,
  InventoryListItem
} from '@al-un/ressaite-core/inventory/inventory.models'
import type { InventoryEndpointTypes } from '@al-un/ressaite-core/inventory/inventory.endpoints'
import { callEndpoint } from '@/core/api'

export const useInventoryStore = defineStore('inventory', () => {
  // ---------- State ---------------------------------------------------------
  const list = ref<InventoryListItem[]>([])
  const cache = reactive<{ [key: number]: InventoryDetail }>({})
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

      cache[inventoryId] = inventory
    }
    loading.value = false
  }

  async function createInventory(newInventory: InventoryFormData) {
    loading.value = true

    const resp = await callEndpoint('inventoryCreate', null, newInventory)
    console.log('resp', resp)
    if (resp.status === 201) {
      const createdInventory = resp.data
      list.value.push(createdInventory)
      cache[createdInventory.id] = { ...createdInventory, containers: [] }
    }

    loading.value = false
  }

  async function updateInventory(inventory: InventoryFormData) {
    loading.value = true
    if (inventory.id === null) {
      throw new Error(`Cannot update inventory ${inventory.name} with null ID`)
    }

    const resp = await callEndpoint('inventoryUpdate', { inventoryId: inventory.id }, inventory)
    if (resp.status === 200) {
      const updatedInventory = resp.data

      cache[updatedInventory.id] = { ...cache[updatedInventory.id], ...updatedInventory }
      if (current.value) {
        current.value = cache[current.value.id]
      }
    }

    loading.value = false
  }

  async function deleteInventory(inventoryId: number) {
    loading.value = true

    const resp = await callEndpoint('inventoryDelete', { inventoryId })
    if (resp.status === 204) {
      delete cache[inventoryId]
    }

    loading.value = false
  }

  async function createInventoryContainer(
    inventoryId: number,
    container: InventoryContainerFormData
  ) {
    loading.value = true
    if (container.id !== null) {
      throw new Error(`Cannot create container with non-null ID: ${JSON.stringify(container)}`)
    }

    const resp = await callEndpoint('inventoryContainerCreate', { inventoryId }, container)
    if (resp.status === 201) {
      const createdContainer = resp.data

      if (current.value && current.value.id === createdContainer.inventoryId) {
        current.value.containers.push({ ...createdContainer, items: [] })
      }
    }

    loading.value = false
  }

  async function updateInventoryContainer(
    inventoryId: number,
    container: InventoryContainerFormData
  ) {
    loading.value = true

    if (container.id === null) {
      throw new Error(`Cannot update container with null ID: ${JSON.stringify(container)}`)
    }

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

      if (current.value && current.value.id === updatedContainer.inventoryId) {
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
      if (current.value && current.value.id === inventoryId) {
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

  async function createInventoryItem(inventoryId: number, item: InventoryItemFormData) {
    loading.value = true

    const resp = await callEndpoint('inventoryItemCreate', { inventoryId }, item)

    if (resp.status === 201) {
      const createdItem = resp.data
      if (current.value && current.value.id === inventoryId) {
        const container = current.value.containers.find((c) => c.id === createdItem.containerId)
        if (container) {
          container.items.push(createdItem)
        } else {
          console.warn(`Could not find container ID ${createdItem.containerId}`)
        }
      }
    }

    loading.value = false
  }

  async function updateInventoryItem(
    inventoryId: number,
    itemId: number,
    item: Partial<InventoryItemFormData>
  ) {
    loading.value = true

    const resp = await callEndpoint(
      'inventoryItemUpdate',
      { inventoryId, inventoryItemId: itemId },
      item
    )
    if (resp.status === 200) {
      const updatedItem = resp.data

      if (current.value && current.value.id === inventoryId) {
        current.value.containers = current.value.containers.map((c) => {
          if (c.id === updatedItem.containerId) {
            let foundInContainer = false
            const items = c.items.map((item) => {
              if (item.id === updatedItem.id) {
                foundInContainer = true
                return updatedItem
              }

              return item
            })

            if (!foundInContainer) items.push(updatedItem)

            return { ...c, items }
          }

          return {
            ...c,
            items: c.items.filter((i) => i.id !== updatedItem.id)
          }
        })
      }
    }

    loading.value = false
  }

  async function deleteInventoryItem(inventoryId: number, containerId: number, itemId: number) {
    loading.value = true

    const resp = await callEndpoint('inventoryItemDelete', {
      inventoryId,
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
