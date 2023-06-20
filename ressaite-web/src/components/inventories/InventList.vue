<template>
  <div v-if="!appStore.isAuthenticated" class="rst-card padded">
    <p>Please login first to manage your inventories</p>
  </div>

  <div v-else class="inventories-container">
    <div v-if="inventoryStore.list?.length === 0">
      <p>Hey, looks like there is inventory here! Let's create one below!</p>
    </div>

    <a
      v-for="inventory in inventoryStore.list"
      :key="inventory.id"
      class="rst-card padded"
      :href="`/inventory/${inventory.id}`"
    >
      <p>{{ inventory.name }}</p>
    </a>

    <div v-if="state.newInventory === null" @click="prepareToCreate" class="rst-card padded">
      Click here to create an inventory
    </div>
    <form v-else @submit.prevent="createInventory" class="rst-card padded rst-form">
      <section class="rst-form__input-group">
        <rst-input v-model="state.newInventory.name" label="Inventory name" />
      </section>

      <section class="rst-form__input-group rst-button-group align-right">
        <button @click="stopCreate" class="rst-button secondary" type="reset">Cancel</button>
        <button class="rst-button primary" type="submit">Create</button>
      </section>
    </form>
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
  newInventory: InventoryCreation | null
}

const state = reactive<State>({
  newInventory: null
})

// https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-pinia/pages/todos/todo.page.vue
const loadInventory = async () => {
  if (!appStore.isAuthenticated) return

  await inventoryStore.loadInventories({ limit: 0, page: 0 })
}

onMounted(loadInventory)
// onServerPrefetch(loadInventory)

function prepareToCreate() {
  state.newInventory = { name: '' }
}

function stopCreate() {
  state.newInventory = null
}

async function createInventory() {
  if (state.newInventory) {
    await inventoryStore.createInventory(state.newInventory)
    stopCreate()
  }
}
</script>

<style lang="scss">
.inventories-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
</style>
