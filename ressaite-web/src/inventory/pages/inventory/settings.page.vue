<template>
  <div v-if="inventoryStore.current" class="central-aligned-page">
    <h1>{{ inventoryStore.current.name }}</h1>

    <section class="setting-section">
      <h2>Inventory properties</h2>

      <form @submit.prevent="saveInventory" class="rst-form">
        <rst-input v-model="state.inventoryForm.name" label="Inventory name"></rst-input>

        <div class="rst-button-group">
          <button class="rst-button primary" type="submit">Rename</button>
        </div>
      </form>
    </section>

    <section class="setting-section">
      <h2>Inventory access</h2>

      <div>Inventory owner: {{ inventoryStore.current.author.username }}</div>
    </section>

    <section class="setting-section">
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
              <button @click="prepareToEditContainer(container)" class="rst-button secondary">
                Edit
              </button>
              <button @click="deleteContainer(container)" class="rst-button danger">Delete</button>
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
            <button @click="stopContainerForm" class="rst-button secondary" type="reset">
              Cancel
            </button>
            <button class="rst-button primary" type="submit">Add container</button>
          </section>
        </form>
      </main>
    </section>

    <section id="danger-zone" class="setting-section">
      <h2>Danger zone</h2>

      <form @submit.prevent="deleteInventory" class="delete-inventory-form rst-form">
        <p>
          Make sure you are ready to delete this inventory: all containers and items will be lost!
        </p>
        <button class="rst-button danger" type="submit">Delete</button>
      </form>
    </section>
  </div>
  <div v-else>Loading inventory...</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onServerPrefetch, reactive } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

import { usePageContext } from '../../../../renderer/usePageContext'
import type {
  InventoryContainer,
  InventoryContainerFormData,
  InventoryFormData
} from '@al-un/ressaite-core/inventory/inventory.models'
import RstInput from '@/core/components/ui/form/RstInput.vue'
import { useInventoryStore } from '@/inventory/stores/inventories'

const inventoryStore = useInventoryStore()
const pageContext = usePageContext()
const inventoryId = parseInt((pageContext as any).routeParams.inventoryId)

// ----------------------------------------------------------------------------

type ContainerForm = InventoryContainerFormData | null

interface State {
  inventoryForm: InventoryFormData
  containerForm: ContainerForm
}
const state = reactive<State>({ inventoryForm: { id: null, name: '' }, containerForm: null })

// ----------------------------------------------------------------------------

const loadInventory = async () => {
  await inventoryStore.loadInventoryById(inventoryId)

  if (inventoryStore.current) {
    state.inventoryForm = {
      id: inventoryStore.current.id,
      name: inventoryStore.current.name
    }
  }
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

const isCreating = computed(() => {
  const check = (form: ContainerForm): form is InventoryContainerFormData => {
    return form !== null && (form as InventoryContainer).id === null
  }
  return check(state.containerForm)
})

const isEditing = computed(() => {
  const check = (form: ContainerForm): form is InventoryContainer => {
    return form !== null && (form as InventoryContainer).id !== null
  }
  return check(state.containerForm)
})

// ----------------------------------------------------------------------------
async function saveInventory() {
  if (inventoryStore.current) {
    await inventoryStore.updateInventory(state.inventoryForm)

    state.inventoryForm = {
      id: inventoryStore.current.id,
      name: inventoryStore.current.name
    }
  }
}

async function deleteInventory() {
  if (inventoryStore.current) {
    await inventoryStore.deleteInventory(inventoryStore.current.id)
    navigate('/')
  }
}

function prepareToCreateContainer() {
  if (!inventoryStore.current) {
    throw new Error(`Current inventory is null, cannot create container`)
  }

  state.containerForm = {
    id: null,
    inventoryId: inventoryStore.current.id,
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

.setting-section {
  margin-block-start: 36px;

  h2 {
    margin-block-end: 8px;
  }
}

#danger-zone {
  h2 {
    color: var(--rst-danger);
  }
}

.delete-inventory-form {
  grid-template-columns: 1fr auto;
  align-items: center;
  border: 1px solid var(--rst-danger);
  border-radius: 8px;
  padding: 8px;
}
</style>
