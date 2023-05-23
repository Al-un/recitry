<template>
  <div class="central-aligned-page">
    <h2>{{ $t('inventories.list.title') }}</h2>

    <div v-if="inventoryStore.list?.length" class="inventories-container">
      <a
        v-for="inventory in inventoryStore.list"
        :key="inventory.id"
        class="rst-card padded"
        :href="`/inventory/${inventory.id}`"
      >
        <p>{{ inventory.name }}</p>
        <p>{{ $t('inventories.list.items_count', [countItems(inventory)]) }}</p>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import type { Inventory } from '@al-un/ressaite-core/inventory/inventory.models'
const inventoryStore = useInventoryStore()

// https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-pinia/pages/todos/todo.page.vue
const loadInventory = async () => await inventoryStore.loadInventories({ limit: 0, page: 0 })
onMounted(loadInventory)
onServerPrefetch(loadInventory)

function countItems(inventory: Inventory): number {
  return inventory.containers.reduce((prev, curr) => prev + curr.items.length, 0)
}
</script>

<style lang="scss">
.inventories-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
</style>
