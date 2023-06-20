<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <header class="inventory__header">
      <h1>{{ inventoryStore.current.name }}</h1>

      <a class="rst-button secondary" :href="`/inventory/${inventoryId}/settings`"
        >Inventory settings</a
      >
    </header>

    <CurrentInventoryItemsList
      :inventory="inventoryStore.current"
      @create="createItem"
      @edit="editItem"
      @delete="deleteItem"
    />
  </div>
  <div v-else>Loading inventory...</div>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import { usePageContext } from '../../renderer/usePageContext'
import type {
  InventoryItem,
  InventoryItemCreation
} from '@al-un/ressaite-core/inventory/inventory.models'
import CurrentInventoryItemsList from '@/components/inventories/CurrentInventoryItemsList.vue'

const inventoryStore = useInventoryStore()
const pageContext = usePageContext()
const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

// ----------------------------------------------------------------------------

const loadInventory = async () => {
  await inventoryStore.loadInventoryById(inventoryId)
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

// ----------------------------------------------------------------------------

async function createItem(containerId: number, item: InventoryItemCreation) {
  await inventoryStore.createInventoryItem(inventoryId, containerId, item)
}

async function editItem(containerId: number, itemId: number, item: Partial<InventoryItemCreation>) {
  await inventoryStore.updateInventoryItem(inventoryId, containerId, itemId, item)
}

async function deleteItem(containerId: number, itemId: number) {
  await inventoryStore.deleteInventoryItem(inventoryId, containerId, itemId)
}
</script>

<style lang="scss">
.inventory__header {
  @include flex-row;
  align-items: center;
  justify-content: space-between;
}
</style>
