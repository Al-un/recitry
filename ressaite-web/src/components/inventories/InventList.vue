<template>
  <div v-if="!appStore.isAuthenticated" class="rst-card padded">
    <p>Please login first to manage your inventories</p>
  </div>

  <div v-else class="inventories-container">
    <div v-if="inventoryStore.list?.length === 0">
      <p>Hey, looks like there is inventory here! Let's create one below!</p>
    </div>

    <div v-for="inventory in inventoryStore.list" :key="inventory.id" class="rst-card padded">
      <!-- <form
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
        </form> -->

      <!-- <template v-else> -->
      <a :href="`/inventory/${inventory.id}`">
        <p>{{ inventory.name }}</p>
      </a>
      <!-- <section class="rst-button-group align-right">
            <button @click="prepareToEdit(inventory)" class="rst-button secondary" type="button">
              Edit
            </button>
            <button @click="deleteInventory(inventory)" class="rst-button danger" type="button">
              Delete
            </button>
          </section> -->
      <!-- </template> -->
    </div>

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
  //   editInventory: Inventory | null
}

const state = reactive<State>({
  newInventory: null
  // editInventory: null
})

// https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-pinia/pages/todos/todo.page.vue
const loadInventory = async () => await inventoryStore.loadInventories({ limit: 0, page: 0 })
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

// function prepareToEdit(inventory: Inventory) {
//   state.editInventory = inventory
// }

// async function editInventory() {
//   if (state.editInventory === null) return

//   await inventoryStore.updateInventory(state.editInventory)
//   state.editInventory = null
// }

// async function deleteInventory(inventory: Inventory) {
//   await inventoryStore.deleteInventory(inventory.id)
// }
</script>

<style lang="scss">
.inventories-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
</style>
