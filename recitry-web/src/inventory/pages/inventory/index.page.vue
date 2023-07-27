<template>
  <div v-if="inventoryStore.current" class="inventory-detail-page central-aligned-page">
    <header class="inventory__header">
      <h1>{{ inventoryStore.current.name }}</h1>

      <div class="inventory__header__actions">
        <button v-if="hasContainers" @click="prepareToCreateItem" class="rst-button primary">
          Add item
        </button>
        <a class="rst-button secondary" :href="`/inventory/${inventoryId}/settings`">
          Inventory settings
        </a>
      </div>
    </header>

    <InventoryItemsList
      :inventory="inventoryStore.current"
      @prepare-to-edit="prepareToEditItem"
      @delete="deleteItem"
    />
  </div>
  <div v-else>Loading inventory...</div>

  <RstModal
    v-if="state.itemForm !== null"
    @close="state.itemForm = null"
    :show="state.itemForm !== null"
  >
    <InventoryItemForm
      @cancel="stopItemForm"
      @update:model-value="saveItem"
      :model-value="state.itemForm"
      :containers="containers"
    />
  </RstModal>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'

import { usePageContext } from '../../../../renderer/usePageContext'
import type {
  InventoryContainer,
  InventoryItem,
  InventoryItemFormData
} from '@al-un/ressaite-core/inventory/inventory.models'
import RstModal from '@/core/components/ui/container/RstModal.vue'
import InventoryItemsList from '@/inventory/components/InventoryItemsList.vue'
import InventoryItemForm from '@/inventory/components/InventoryItemForm.vue'
import { useInventoryStore } from '@/inventory/stores/inventories'

const inventoryStore = useInventoryStore()
const pageContext = usePageContext()
const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

// ----------------------------------------------------------------------------

interface ExtendedInventoryItemFormData extends InventoryItemFormData {
  containerId: number
}

interface State {
  itemForm: ExtendedInventoryItemFormData | null
}

const state = reactive<State>({
  itemForm: null
})

// ----------------------------------------------------------------------------

const containers = computed<InventoryContainer[]>(() => {
  if (inventoryStore.current === null) return []

  return inventoryStore.current.containers
})

const hasContainers = computed<boolean>(() => containers.value.length > 0)

// ----------------------------------------------------------------------------

const loadInventory = async () => {
  await inventoryStore.loadInventoryById(inventoryId)
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

// ----------------------------------------------------------------------------

function prepareToCreateItem() {
  if (!inventoryStore.current) return

  state.itemForm = {
    id: null,
    name: '',
    quantity: 1,
    containerId: inventoryStore.current.containers[0].id,
    material: null,
    dueDate: null
  }
}

function prepareToEditItem(item: InventoryItem, containerId: number) {
  state.itemForm = {
    id: item.id,
    name: item.name,
    containerId: containerId,
    quantity: item.quantity,
    material: item.material,
    dueDate: item.dueDate
  }
}

function stopItemForm() {
  state.itemForm = null
}

function saveItem() {
  if (!state.itemForm) return

  if (state.itemForm.id === null) {
    inventoryStore.createInventoryItem(inventoryId, state.itemForm)
  } else {
    inventoryStore.updateInventoryItem(inventoryId, state.itemForm.id, state.itemForm)
  }
  stopItemForm()
}

async function deleteItem(containerId: number, itemId: number) {
  await inventoryStore.deleteInventoryItem(inventoryId, containerId, itemId)
}
</script>

<style lang="scss">
.inventory__header {
  // same as .materials__header
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 16px;
}

.inventory__header__actions {
  @include flex-row;
  align-items: center;

  * + * {
    margin-inline-start: 8px;
  }
}
</style>
