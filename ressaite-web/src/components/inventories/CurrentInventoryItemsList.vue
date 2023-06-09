<template>
  <main v-if="inventory.containers.length === 0" class="rst-card padded">
    There is no container at the moment, let's create one!
  </main>

  <form v-else @submit.prevent="saveItem()" class="items-container">
    <div>ID</div>
    <div>Container</div>
    <div>Quantity</div>
    <div>Name</div>
    <div>Material</div>
    <div>Best before</div>
    <div>Created date</div>
    <div>Updated date</div>
    <div>Action</div>

    <template v-for="item in items" :key="item.id">
      <template v-if="state.itemForm && (state.itemForm as InventoryItemEditForm).id === item.id">
        <div>{{ item.id }}</div>
        <div>
          <select v-model="state.itemForm.containerId">
            <option v-for="c in inventory.containers" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
        <div>
          <rst-input v-model="state.itemForm.quantity" type="number" />
        </div>
        <div>
          <rst-input v-model="state.itemForm.name" type="text" />
        </div>
        <div>{{ item.material?.name }}</div>
        <div>
          <rst-input v-model="state.itemForm.dueDate" type="date" />
        </div>
        <div>{{ item.formattedCreatedAt }}</div>
        <div>{{ item.formattedUpdatedAt }}</div>
        <div class="rst-button-group">
          <button @click="stopItemForm()" class="rst-button secondary" type="reset">Cancel</button>
          <button class="rst-button primary" type="submit">Edit</button>
        </div>
      </template>
      <template v-else>
        <div>{{ item.id }}</div>
        <div>{{ item.containerName }}</div>
        <div>{{ item.quantity }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.material?.name }}</div>
        <div>{{ item.formattedDueDate }}</div>
        <div>{{ item.formattedCreatedAt }}</div>
        <div>{{ item.formattedUpdatedAt }}</div>
        <div class="rst-button-group">
          <button @click="prepareToEditItem(item)" class="rst-button primary" type="button">
            Edit
          </button>
          <button @click="deleteItem(item)" class="rst-button danger" type="button">Delete</button>
        </div>
      </template>
    </template>

    <template v-if="state.itemForm && (state.itemForm as InventoryItemEditForm).id === undefined">
      <div></div>
      <div>
        <select v-model="state.itemForm.containerId">
          <option v-for="c in inventory.containers" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div>
        <rst-input v-model="state.itemForm.quantity" type="number" />
      </div>
      <div>
        <rst-input v-model="state.itemForm.name" type="text" />
      </div>
      <div></div>
      <div>
        <rst-input v-model="state.itemForm.dueDate" type="date" />
      </div>
      <div></div>
      <div></div>
      <div class="rst-button-group">
        <button @click="stopItemForm()" class="rst-button secondary" type="reset">Cancel</button>
        <button class="rst-button primary" type="submit">Create</button>
      </div>
    </template>
  </form>

  <div v-if="state.itemForm === null" @click="prepareToCreateItem()">Click to add an item</div>

  <!-- <main
      v-for="container in inventoryStore.current.containers"
      :key="container.id"
      class="rst-card padded"
    >
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
    </main> -->
</template>

<script lang="ts" setup>
import { computed, onMounted, onServerPrefetch, reactive, type PropType } from 'vue'

import { useAppStore } from '@/stores/app'
import { useInventoryStore } from '@/stores/inventories'
import RstInput from '@/components/ui/form/RstInput.vue'
import type {
  InventoryContainer,
  InventoryContainerCreation,
  InventoryDetail,
  InventoryItem,
  InventoryItemCreation
} from '@al-un/ressaite-core/inventory/inventory.models'
import { formatDate } from '@/utils/datetime'
import { appendFile } from 'fs'

const appStore = useAppStore()
const inventoryStore = useInventoryStore()

// ----------------------------------------------------------------------------

const props = defineProps({
  inventory: {
    type: Object as PropType<InventoryDetail>,
    required: true
  }
})

const emit = defineEmits(['create', 'edit', 'delete'])

// ----------------------------------------------------------------------------

interface FormattedItem extends InventoryItem {
  containerId: number
  containerName: string
  formattedDueDate: string | null
  formattedCreatedAt: string | null
  formattedUpdatedAt: string | null
}

interface InventoryItemEditForm extends InventoryItem {
  containerId: number
}

interface InventoryItemCreateForm extends InventoryItemCreation {
  containerId: number
}

interface State {
  itemForm: InventoryItemCreateForm | InventoryItemEditForm | null
}

const state = reactive<State>({
  itemForm: null
})

// ----------------------------------------------------------------------------

const items = computed<FormattedItem[]>(() => {
  if (props.inventory === null) {
    return []
  }

  const formattedItems = props.inventory.containers.reduce((acc, container) => {
    const containerItems = container.items.map((i) => ({
      ...i,
      containerId: container.id,
      containerName: container.name,
      formattedDueDate: i.dueDate ? formatDate(i.dueDate) : null,
      formattedCreatedAt: i.createdAt ? formatDate(i.createdAt) : null,
      formattedUpdatedAt: i.updatedAt ? formatDate(i.updatedAt) : null
    }))

    return [...acc, ...containerItems]
  }, [] as FormattedItem[])

  return formattedItems
})

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------

function prepareToCreateItem() {
  state.itemForm = {
    name: '',
    quantity: 1,
    containerId: props.inventory.containers[0].id,
    materialId: null,
    dueDate: null
  }
}

function prepareToEditItem(item: FormattedItem) {
  state.itemForm = {
    id: item.id,
    name: item.name,
    containerId: item.containerId,
    quantity: item.quantity,
    materialId: item.material && item.material?.id,
    dueDate: item.dueDate
  }
}

function stopItemForm() {
  state.itemForm = null
}

function saveItem() {
  if (state.itemForm) {
    const event = (state.itemForm as InventoryItemEditForm).id !== undefined ? 'edit' : 'create'
    emit(event, state.itemForm.containerId, state.itemForm)
  }
  stopItemForm()
}

async function deleteItem(item: FormattedItem) {
  emit('delete', item.containerId, item.id)
}
</script>

<style lang="scss">
.items-container {
  display: grid;
  grid-template-columns: repeat(9, auto);

  @include media('<tablet') {
  }
}
</style>
