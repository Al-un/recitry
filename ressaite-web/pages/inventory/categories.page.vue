<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h1>{{ inventoryStore.current.name }}</h1>

    <h2>Create an inventory container</h2>

    <main class="containers-container">
      <div
        v-for="container in inventoryStore.current.containers"
        :key="container.id"
        class="rst-card padded"
      >
        <form
          v-if="state.containerForm !== null && (state.containerForm as InventoryContainer).id === container.id"
          @submit.prevent="saveContainer()"
        >
          <section class="rst-form__input-group">
            <rst-input v-model="state.containerForm.name" label="Container name" />
          </section>

          <section class="rst-form__input-group rst-button-group align-right">
            <button @click="stopContainerForm" class="rst-button secondary" type="reset">
              Cancel
            </button>
            <button class="rst-button primary" type="submit">Edit</button>
          </section>
        </form>
        <template v-else>
          <p>{{ container.name }}</p>

          <section class="rst-button-group align-right">
            <rst-button @click="prepareToEditContainer(container)" class="rst-button secondary"
              >Edit</rst-button
            >
            <rst-button @click="deleteContainer(container)" class="rst-button danger"
              >Delete</rst-button
            >
          </section>
        </template>
      </div>

      <div
        v-if="state.containerForm === null"
        @click="prepareToCreateContainer"
        class="rst-card padded"
      >
        Create a new container
      </div>
      <form
        v-if="state.containerForm && isCreating"
        @submit.prevent="saveContainer"
        class="rst-form rst-card padded"
      >
        <section class="rst-form__input-group">
          <rst-input v-model="state.containerForm.name" label="Container name" />
        </section>

        <section class="rst-form__input-group rst-button-group align-right">
          <button class="rst-button primary" type="submit">Add container</button>
        </section>
      </form>
    </main>

    <!-- <form @submit.prevent="createContainer" class="rst-card padded rst-form">
      <section class="rst-form__input-group">
        <rst-input v-model="state.newContainer.name" label="Container name" />
      </section>
      <section class="rst-form__input-group rst-button-group align-right">
        <button class="rst-button primary" type="submit">Add container</button>
      </section>
    </form> -->
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

type ContainerForm = InventoryContainerCreation | InventoryContainer | null

interface State {
  containerForm: ContainerForm
}
const state = reactive<State>({ containerForm: null })

// ----------------------------------------------------------------------------

const loadInventory = async () => {
  await inventoryStore.loadInventoryById(inventoryId)
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

const isCreating = computed(() => {
  const check = (form: ContainerForm): form is InventoryContainerCreation => {
    return form !== null && (form as InventoryContainer).id === undefined
  }
  return check(state.containerForm)
})

const isEditing = computed(() => {
  const check = (form: ContainerForm): form is InventoryContainer => {
    return form !== null && (form as InventoryContainer).id !== undefined
  }
  return check(state.containerForm)
})

// ----------------------------------------------------------------------------

function prepareToCreateContainer() {
  state.containerForm = {
    name: ''
  }
}

function prepareToEditContainer(container: InventoryContainer) {
  state.containerForm = container
}

function stopContainerForm() {
  state.containerForm = null
}

async function saveContainer() {
  const check = (form: ContainerForm): form is InventoryContainer => {
    return form !== null && (form as InventoryContainer).id !== undefined
  }

  const { containerForm } = state
  if (containerForm === null) return

  if (check(containerForm)) {
    await inventoryStore.updateInventoryContainer(inventoryId, containerForm)
  } else {
    await inventoryStore.createInventoryContainer(inventoryId, containerForm)
  }
  stopContainerForm()
}

async function deleteContainer(container: InventoryContainer) {
  await inventoryStore.deleteInventoryContainer(inventoryId, container.id)
}
</script>

<style lang="scss">
.containers-container {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);

  @include media('<tablet') {
    grid-template-columns: 1fr;
  }
}
</style>
