<template>
  <div v-if="inventoryStore.current" class="inventory-detail-page central-aligned-page">
    <header class="inventory__header">
      <h1>{{ inventoryStore.current.name }}</h1>

      <div class="inventory__header__actions">
        <button @click="prepareToCreateItem" class="rst-button primary">Add item</button>
        <a class="rst-button secondary" :href="`/inventory/${inventoryId}/settings`"
          >Inventory settings</a
        >
      </div>
    </header>

    <CurrentInventoryItemsList
      :inventory="inventoryStore.current"
      @prepare-to-edit="prepareToEditItem"
      @delete="deleteItem"
    />
  </div>
  <div v-else>Loading inventory...</div>

  <RstModal v-if="state.itemForm" @close="state.itemForm = null" :show="state.itemForm !== null">
    <InventItemForm
      @cancel="stopItemForm"
      @update:model-value="saveItem"
      :model-value="state.itemForm"
    />
  </RstModal>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch, reactive } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import { usePageContext } from '../../renderer/usePageContext'
import type {
  InventoryItem,
  InventoryItemCreation
} from '@al-un/ressaite-core/inventory/inventory.models'
import CurrentInventoryItemsList from '@/components/inventories/CurrentInventoryItemsList.vue'
import RstModal from '@/components/ui/container/RstModal.vue'
import InventItemForm from '@/components/inventories/InventItemForm.vue'

const inventoryStore = useInventoryStore()
const pageContext = usePageContext()
const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

// ----------------------------------------------------------------------------

interface InventoryItemForm extends InventoryItemCreation {
  containerId: number
}

interface State {
  itemForm: InventoryItemForm | null
}

const state = reactive<State>({
  itemForm: null
})

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
    materialId: null,
    dueDate: null
  }
}

function prepareToEditItem(item: InventoryItem, containerId: number) {
  state.itemForm = {
    id: item.id,
    name: item.name,
    containerId: containerId,
    quantity: item.quantity,
    materialId: item.material && item.material?.id,
    dueDate: item.dueDate
  }
}

function stopItemForm() {
  state.itemForm = null
}

function saveItem() {
  if (!state.itemForm) return

  if (state.itemForm.id !== null) {
    inventoryStore.updateInventoryItem(
      inventoryId,
      state.itemForm.containerId,
      state.itemForm.id,
      state.itemForm
    )
  } else {
    inventoryStore.createInventoryItem(inventoryId, state.itemForm.containerId, state.itemForm)
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
