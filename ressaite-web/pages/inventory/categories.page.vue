<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h1>{{ inventoryStore.current.name }}</h1>

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

const inventoryStore = useInventoryStore()
const pageContext = usePageContext()
const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

// ----------------------------------------------------------------------------

interface State {
  containerForm: InventoryContainerCreation | InventoryContainer | null
}

const state = reactive<State>({
  containerForm: null
})

// ----------------------------------------------------------------------------

const loadInventory = async () => {
  await inventoryStore.loadInventoryById(inventoryId)
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

// ----------------------------------------------------------------------------

async function createContainer() {
  await inventoryStore.createInventoryContainer(inventoryId, state.newContainer)

}

function prepareToEditContainer(container: InventoryContainer) {
  state.containerForm = container
}

function stopEditContainer() {
  state.containerForm = null
}

async function editContainer() {
  if (state.containerForm && (state.containerForm as InventoryContainer).id !== null) {
    await inventoryStore.updateInventoryContainer(inventoryId, state.containerForm)
  }
  stopEditContainer()
}

async function deleteContainer(container: InventoryContainer) {
  await inventoryStore.deleteInventoryContainer(inventoryId, container.id)
}
</script>

<style lang="scss"></style>
