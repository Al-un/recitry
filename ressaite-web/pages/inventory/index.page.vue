<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h1>{{ inventoryStore.current.name }}</h1>

    <CurrentInventoryItemsList
      :inventory="inventoryStore.current"
      @create="createItem"
      @edit="editItem"
      @delete="deleteItem"
    />

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
import { computed, onMounted, onServerPrefetch, reactive } from 'vue'

import { useInventoryStore } from '@/stores/inventories'
import { usePageContext } from '../../renderer/usePageContext'
import RstInput from '@/components/ui/form/RstInput.vue'
import type {
  InventoryContainer,
  InventoryContainerCreation,
  InventoryItem,
  InventoryItemCreation
} from '@al-un/ressaite-core/inventory/inventory.models'
import { formatDate } from '@/utils/datetime'
import CurrentInventoryItemsList from '@/components/inventories/CurrentInventoryItemsList.vue'

const inventoryStore = useInventoryStore()
const pageContext = usePageContext()
const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

// ----------------------------------------------------------------------------

interface FormattedItems extends InventoryItem {
  containerName: string
  formattedDueDate: string | null
  formattedCreatedAt: string | null
  formattedUpdatedAt: string | null
}

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

// ----------------------------------------------------------------------------

const items = computed<FormattedItems[]>(() => {
  if (inventoryStore.current === null) {
    return []
  }

  const formattedItems = inventoryStore.current.containers.reduce((acc, container) => {
    const containerItems = container.items.map((i) => ({
      ...i,
      containerName: container.name,
      formattedDueDate: i.dueDate ? formatDate(i.dueDate) : null,
      formattedCreatedAt: i.createdAt ? formatDate(i.createdAt) : null,
      formattedUpdatedAt: i.updatedAt ? formatDate(i.updatedAt) : null
    }))

    return [...acc, ...containerItems]
  }, [] as FormattedItems[])

  return formattedItems
})

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

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

async function createItem(containerId: number, item: InventoryItemCreation) {
  await inventoryStore.createInventoryItem(inventoryId, containerId, item)
}

async function editItem(containerId: number, item: InventoryItem) {
  await inventoryStore.updateInventoryItem(inventoryId, containerId, item)
}

async function deleteItem(containerId: number, itemId: number) {
  await inventoryStore.deleteInventoryItem(inventoryId, containerId, itemId)
}
</script>

<style lang="scss"></style>
