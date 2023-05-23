<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h2></h2>
  </div>
  <div v-else>
    Loading inventory...
    <hr />
    <pre>{{ inventoryStore.list }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onServerPrefetch } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import type { Inventory } from '@al-un/ressaite-core/inventory/inventory.models'
import { usePageContext } from '../../renderer/usePageContext'
const inventoryStore = useInventoryStore()

const pageContext = usePageContext()

const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

const loadInventory = async () => await inventoryStore.loadInventoryById(inventoryId)
onMounted(loadInventory)
onServerPrefetch(loadInventory)
</script>

<style></style>
