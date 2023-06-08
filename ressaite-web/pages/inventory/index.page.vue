<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h1>{{ inventoryStore.current.name }}</h1>

    <main v-if="inventoryStore.current.containers.length === 0" class="rst-card padded">
      There is no container at the moment, let's create one!
    </main>

    <main
      v-for="container in inventoryStore.current.containers"
      :key="container.id"
      class="rst-card padded"
    >
      <!-- Container name -->
      <header v-if="state.editContainer?.id !== container.id" class="container-header">
        <h2>{{ container.name }}</h2>
        <div class="flex-spacer"></div>
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
      <form v-else @submit.prevent="editContainer" class="container-header rst-form">
        <rst-input v-model="state.editContainer.name" />
        <button @click="stopEditContainer" class="rst-button secondary" type="cancel">
          Cancel
        </button>
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
              <button @click="stopEditItem" class="rst-button secondary" type="reset">
                Cancel
              </button>
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
    </main>

    <h2>Create an inventory container</h2>

    <form @submit.prevent="createContainer" class="rst-card padded rst-form">
      <section class="rst-form__input-group">
        <rst-input v-model="state.newContainer.name" label="Container name" />
      </section>
      <section class="rst-form__input-group rst-button-group align-right">
        <button class="rst-button primary" type="submit">Add container</button>
      </section>
    </form>
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
  newItem: { [id: number]: InventoryItemCreation }
  editItem: InventoryItem | null
  /** To save the container ID of an edited item */
  containerId: number
}

const state = reactive<State>({
  newContainer: { name: '' },
  editContainer: null,
  newItem: {},
  editItem: null,
  containerId: -1
})

const loadInventory = async () => {
  await inventoryStore.loadInventoryById(inventoryId)
  if (inventoryStore.current) {
    state.newItem = inventoryStore.current.containers.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.id]: { name: '', quantity: 1, dueDate: null, materialId: null }
      }),
      {} as { [id: number]: InventoryItemCreation }
    )
  }
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

async function createContainer() {
  await inventoryStore.createInventoryContainer(inventoryId, state.newContainer)

  if (inventoryStore.current) {
    const { containers } = inventoryStore.current
    const lastContainer = containers[containers.length - 1]
    state.newItem[lastContainer.id] = {
      name: '',
      quantity: 1,
      dueDate: null,
      materialId: null
    }
  }
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

function stopCreateItem(containerId: number) {
  state.newItem[containerId] = {
    name: '',
    quantity: 1,
    dueDate: null,
    materialId: null
  }
}

async function createItem(containerId: number) {
  await inventoryStore.createInventoryItem(inventoryId, containerId, state.newItem[containerId])

  state.newItem[containerId] = {
    name: '',
    quantity: 1,
    dueDate: null,
    materialId: null
  }
}

function prepareToEditItem(containerId: number, item: InventoryItem) {
  state.editItem = item
  state.containerId = containerId
}

function stopEditItem() {
  state.editItem = null
  state.editContainer = null
}

async function editItem() {
  if (state.editItem) {
    await inventoryStore.updateInventoryItem(inventoryId, state.containerId, state.editItem)
    stopEditItem()
  }
}

async function deleteItem(containerId: number, item: InventoryItem) {
  await inventoryStore.deleteInventoryItem(inventoryId, containerId, item.id)
}
</script>

<style lang="scss">
.container-header {
  @include flex-row;
  margin-block-end: 16px;

  .rst-input {
    flex-grow: 1;
    margin-inline-end: 8px;
  }

  .rst-button + .rst-button {
    margin-inline-start: 8px;
  }
}

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
