<template>
  <!-- Container name -->
  <header v-if="state.editContainer?.id !== container.id" class="container-header">
    <h2>{{ container.name }}</h2>
    <div class="flex-spacer"></div>
    <button @click="prepareToEditContainer(container)" class="rst-button secondary" type="button">
      Edit
    </button>
    <button @click="deleteContainer(container)" class="rst-button danger" type="button">
      Delete
    </button>
  </header>
  <form v-else @submit.prevent="editContainer" class="container-header rst-form">
    <rst-input v-model="state.editContainer.name" />
    <button @click="stopEditContainer" class="rst-button secondary" type="cancel">Cancel</button>
    <button class="rst-button primary" type="submit">Edit</button>
  </form>

  <!-- Material table -->
  <main class="rst-table inventory-item-table">
    <div class="rst-table-row">
      <div class="inventory-item-table__id">Id</div>
      <div class="inventory-item-table__name">Name</div>
      <div class="inventory-item-table__material">Material</div>
      <div class="inventory-item-table__quantity">Quantity</div>
      <div class="inventory-item-table__dueDate">Best before</div>
      <div class="inventory-item-table__created">Created</div>
      <div class="inventory-item-table__update">Updated</div>
      <div class="inventory-item-table__action">action</div>
    </div>

    <div v-for="containerItem in container.items" :key="containerItem.id" class="rst-table-row">
      <form
        v-if="state.editItem && state.editItem?.id === containerItem.id"
        @submit.prevent="editItem"
      >
        <div class="inventory-item-table__id">{{ containerItem.id }}</div>
        <div class="inventory-item-table__name">
          <rst-input v-model="state.editItem.name" />
        </div>
        <div class="inventory-item-table__material">{{ containerItem.material?.name }}</div>
        <div class="inventory-item-table__quantity">
          <rst-input v-model="state.editItem.quantity" type="number" />
        </div>
        <div class="inventory-item-table__dueDate">
          <rst-input v-model="state.editItem.dueDate" type="date" />
        </div>
        <div class="inventory-item-table__created">{{ containerItem.createdAt }}</div>
        <div class="inventory-item-table__update">{{ containerItem.updatedAt }}</div>
        <div class="inventory-item-table__action">
          <button @click="stopEditItem" class="rst-button secondary" type="reset">Cancel</button>
          <button class="rst-button primary" type="submit">Edit</button>
        </div>
      </form>
      <template v-else>
        <div class="inventory-item-table__id">{{ containerItem.id }}</div>
        <div class="inventory-item-table__name">{{ containerItem.name }}</div>
        <div class="inventory-item-table__material">{{ containerItem.material?.name }}</div>
        <div class="inventory-item-table__quantity">{{ containerItem.quantity }}</div>
        <div class="inventory-item-table__dueDate">{{ containerItem.dueDate }}</div>
        <div class="inventory-item-table__created">{{ containerItem.createdAt }}</div>
        <div class="inventory-item-table__update">{{ containerItem.updatedAt }}</div>
        <div class="inventory-item-table__action">
          <button
            @click="prepareToEditItem(container.id, containerItem)"
            class="rst-button secondary"
            type="button"
          >
            Edit
          </button>
          <button
            @click="deleteItem(container.id, containerItem)"
            class="rst-button danger"
            type="button"
          >
            Delete
          </button>
        </div>
      </template>
    </div>
  </main>

  <!-- Create new material -->
  <form @submit.prevent="createItem(container.id)" class="rst-form">
    <rst-input
      v-model="state.newItem[container.id].name"
      class="inventory-item__name"
      label="Name"
      type="text"
    />
    <rst-input
      v-model="state.newItem[container.id].quantity"
      class="inventory-item__quantity"
      label="Quantity"
      type="number"
    />
    <rst-input
      v-model="state.newItem[container.id].dueDate"
      class="inventory-item__due-date"
      label="Best before"
      type="date"
    />

    <section class="rst-button-group">
      <button type="submit" class="rst-button primary">Create</button>
    </section>
  </form>
</template>

<script lang="ts" setup>
import { reactive, type PropType, computed } from 'vue'

import type {
  InventoryContainerWithItems,
  InventoryContainer,
  InventoryItem
} from '@al-un/ressaite-core/inventory/inventory.models'
import { useInventoryStore } from '@/stores/inventories'

// ----------------------------------------------------------------------------

const inventoryStore = useInventoryStore()

const props = defineProps({
  inventoryId: { type: Number, required: true },
  container: {
    type: Object as PropType<InventoryContainerWithItems>,
    required: true
  }
})

// ----------------------------------------------------------------------------

interface State {
  editContainer: InventoryContainer | null
  newItem: InventoryItem | null
  editItem: InventoryItem | null
}
const state = reactive<State>({
  editContainer: null,
  newItem: null,
  editItem: null
})

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
function prepareToEditContainer(container: InventoryContainer) {
  state.editContainer = container
}

function stopEditContainer() {
  state.editContainer = null
}

async function editContainer() {
  if (state.editContainer) {
    await inventoryStore.updateInventoryContainer(props.inventoryId, state.editContainer)
  }
  stopEditContainer()
}
</script>

<style lang="scss"></style>
