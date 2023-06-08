<template>
  <div class="central-aligned-page">
    <h1>Inventories</h1>

    <h2>{{ $t('inventories.list.title') }}</h2>

    <div v-if="!appStore.isAuthenticated">Please login first...</div>

    <template v-else>
      <div v-if="inventoryStore.list?.length" class="inventories-container">
        <div v-for="inventory in inventoryStore.list" :key="inventory.id" class="rst-card padded">
          <form
            v-if="state.editInventory?.id === inventory.id"
            @submit.prevent="editInventory()"
            class="rst-form"
          >
            <section class="rst-form__input-group">
              <rst-input v-model="state.editInventory.name" label="Inventory name" />
            </section>

            <section class="rst-form__input-group rst-button-group align-right">
              <button @click="state.editInventory = null" class="rst-button danger" type="reset">
                Cancel
              </button>
              <button class="rst-button primary" type="submit">Edit</button>
            </section>
          </form>

          <template v-else>
            <a :href="`/inventory/${inventory.id}`">
              <p>{{ inventory.name }}</p>
            </a>
            <section class="rst-button-group align-right">
              <button @click="prepareToEdit(inventory)" class="rst-button secondary" type="button">
                Edit
              </button>
              <button @click="deleteInventory(inventory)" class="rst-button danger" type="button">
                Delete
              </button>
            </section>
          </template>
        </div>
      </div>
      <div v-else>
        <p>Hey, looks like there is inventory here! Let's create one below!</p>
      </div>

      <h2>Create a new inventory</h2>
      <form @submit.prevent="createInventory" class="rst-card padded rst-form">
        <section class="rst-form__input-group">
          <rst-input v-model="state.newInventory.name" label="Inventory name" />
        </section>

        <section class="rst-form__input-group rst-button-group align-right">
          <button class="rst-button primary" type="submit">Create</button>
        </section>
      </form>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onServerPrefetch, reactive } from 'vue'

import RstInput from '@/components/ui/form/RstInput.vue'

import { useAppStore } from '@/stores/app'
import { useInventoryStore } from '@/stores/inventories'
import type { Inventory, InventoryCreation } from '@al-un/ressaite-core/inventory/inventory.models'

const appStore = useAppStore()
const inventoryStore = useInventoryStore()

interface State {
  newInventory: InventoryCreation
  editInventory: Inventory | null
}

const state = reactive<State>({ newInventory: { name: '' }, editInventory: null })

// https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-pinia/pages/todos/todo.page.vue
const loadInventory = async () => await inventoryStore.loadInventories({ limit: 0, page: 0 })
onMounted(loadInventory)
// onServerPrefetch(loadInventory)

async function createInventory() {
  await inventoryStore.createInventory(state.newInventory)
  state.newInventory = { name: '' }
}

function prepareToEdit(inventory: Inventory) {
  state.editInventory = inventory
}

async function editInventory() {
  if (state.editInventory === null) return

  await inventoryStore.updateInventory(state.editInventory)
  state.editInventory = null
}

async function deleteInventory(inventory: Inventory) {
  await inventoryStore.deleteInventory(inventory.id)
}
</script>

<style lang="scss">
.inventories-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
</style>
