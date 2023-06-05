<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h2>{{ inventoryStore.current.name }}</h2>

    <div
      v-for="container in inventoryStore.current.containers"
      :key="container.id"
      class="rst-card padded"
    >
      <header v-if="state.editContainer?.id !== container.id">
        <h3>{{ container.name }}</h3>
        <button
          @click="prepareToEditContainer(container)"
          class="rst-button secondary"
          type="button"
        >
          Edit
        </button>
        <button @click="deleteContainer(container)" class="rst-button danger" type="button">
          Delete
        </button>
      </header>
      <form v-else @submit.prevent="editContainer">
        <rst-input v-model="state.editContainer.name" />
        <button @click="stopEditContainer" class="rst-button secondary" type="cancel">
          Cancel
        </button>
        <button class="rst-button primary" type="submit">Edit</button>
      </form>

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
          <template v-if="state.editItem?.id === containerItem.id">
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
          <form v-if="state.editItem" @submit.prevent="editItem">
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
              <button @click="stopEditItem" class="rst-button secondary" type="reset">
                Cancel
              </button>
              <button class="rst-button primary" type="submit">Edit</button>
            </div>
          </form>
          <div v-else>Sorry, something wrong happened...</div>
        </div>
      </main>
    </div>

    <form @submit.prevent="createContainer" class="rst-card padded">
      <rst-input v-model="state.newContainer.name" label="Container name" />
      <button class="rst-button primary" type="submit">Add container</button>
    </form>

    <pre>{{ inventoryStore.current }}</pre>
  </div>
  <div v-else>Loading inventory...</div>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch, reactive } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import { usePageContext } from '../../renderer/usePageContext'
import RstInput from '@/components/ui/form/RstInput.vue'
import type {
  InventoryContainer,
  InventoryContainerCreation,
  InventoryItem,
  InventoryItemCreation
} from '@al-un/ressaite-core/inventory/inventory.models'
const inventoryStore = useInventoryStore()

const pageContext = usePageContext()

const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

interface State {
  newContainer: InventoryContainerCreation
  editContainer: InventoryContainer | null
  newItem: InventoryItemCreation | null
  editItem: InventoryItem | null
  containerId: number
}

const state = reactive<State>({
  newContainer: { name: '' },
  editContainer: null,
  newItem: null,
  editItem: null,
  containerId: -1
})

const loadInventory = async () => await inventoryStore.loadInventoryById(inventoryId)
onMounted(loadInventory)
// onServerPrefetch(loadInventory)

async function createContainer() {
  await inventoryStore.createInventoryContainer(inventoryId, state.newContainer)
}

function prepareToEditContainer(container: InventoryContainer) {
  state.editContainer = container
}

function stopEditContainer() {
  state.editContainer = null
}

async function editContainer() {
  if (state.editContainer) {
    await inventoryStore.updateInventoryContainer(inventoryId, state.editContainer)
  }
  stopEditContainer()
}

async function deleteContainer(container: InventoryContainer) {
  await inventoryStore.deleteInventoryContainer(inventoryId, container.id)
}

function prepateToCreateItem(containerId: number) {
  state.newItem = {
    name: '',
    quantity: 1,
    dueDate: null,
    materialId: null
  }
}

function stopCreateItem() {
  state.newItem = null
}

async function createItem() {
  if (state.newItem === null) {
    throw new Error('Cannot create a null item')
  }

  await inventoryStore.createInventoryItem(inventoryId, state.containerId, state.newItem)
}

function prepareToEditItem(containerId: number, item: InventoryItem) {
  state.editItem = item
  state.containerId = containerId
}

function stopEditItem() {
  state.editContainer = null
}

async function editItem() {
  if (state.editItem) {
    await inventoryStore.updateInventoryItem(inventoryId, state.editItemContainerId, state.editItem)
  }
}

async function deleteItem(containerId: number, item: InventoryItem) {
  await inventoryStore.deleteInventoryItem(inventoryId, containerId, item.id)
}
</script>

<style lang="scss">
.inventory-item-table {
  justify-content: space-between;
}
.inventory-item-table__id {
}
.inventory-item-table__name {
}
.inventory-item-table__material {
}
.inventory-item-table__quantity {
}
.inventory-item-table__dueDate {
}
.inventory-item-table__created {
}
.inventory-item-table__update {
}
.inventory-item-table__action {
}
</style>
