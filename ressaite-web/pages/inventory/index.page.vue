<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h2>{{ inventoryStore.current.name }}</h2>

    <div
      v-for="container in inventoryStore.current.containers"
      :key="container.id"
      class="rst-card padded"
    >
      <h3>{{ container.name }}</h3>
      <div v-for="containerItem in container.items" :key="containerItem.id" class="container-item">
        <div>
          <span>{{ containerItem.name }}</span>
          <span v-if="containerItem.material">({{ containerItem.material }})</span>
        </div>
        <div class="flex-spacer"></div>
        <div></div>
        <div>{{ containerItem.qty }}</div>
        <div></div>
      </div>
    </div>

    <div>
      <div class="rst-button primary">Add container</div>
    </div>
  </div>
  <div v-else>Loading inventory...</div>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import { usePageContext } from '../../renderer/usePageContext'
const inventoryStore = useInventoryStore()

const pageContext = usePageContext()

const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

const loadInventory = async () => await inventoryStore.loadInventoryById(inventoryId)
onMounted(loadInventory)
onServerPrefetch(loadInventory)
</script>

<style lang="scss">
.container-item {
  display: flex;
  flex-direction: row;
}
</style>
