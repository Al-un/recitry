<template>
  <div class="central-aligned-page">
    <h2>{{ $t('inventories.list.title') }}</h2>

    <div v-if="!appStore.isAuthenticated">Please login first...</div>

    <template v-else>
      <div v-if="inventoryStore.list?.length" class="inventories-container">
        <div v-for="inventory in inventoryStore.list" :key="inventory.id" class="rst-card padded">
          <form v-if="state.editInventory?.id === inventory.id" @submit.prevent="editInventory()">
            <rst-input v-model="state.editInventory.name" label="Inventory name" />

            <section>
              <button @click="state.editInventory = null" rst="rst-button danger" type="reset">
                Cancel
              </button>
              <button rst="rst-button primary" type="submit">Edit</button>
            </section>
          </form>

          <template v-else>
            <a :href="`/inventory/${inventory.id}`">
              <p>{{ inventory.name }}</p>
            </a>
            <section>
              <button @click="prepareToEdit(inventory)" rst="rst-button secondary" type="button">
                Edit
              </button>
              <button @click="deleteInventory(inventory)" rst="rst-button danger" type="button">
                Delete
              </button>
            </section>
          </template>
        </div>
      </div>
      <div v-else>
        <p>Hey, looks like there is inventory here! Let's create one below!</p>
      </div>

      <form @submit.prevent="createInventory" class="rst-card padded">
        <rst-input v-model="state.newInventory.name" label="Inventory name" />

        <button class="rst-button primary" type="submit">Create</button>
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
