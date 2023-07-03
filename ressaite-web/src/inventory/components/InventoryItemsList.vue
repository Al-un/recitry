<template>
  <main v-if="inventory.containers.length === 0" class="rst-card padded">
    There is no container at the moment, let's create one in the Inventory settings.
  </main>

  <main v-if="inventory.containers.length > 0 && state.displayMode === 'container'">
    <section v-for="c in itemsByContainers" :key="c.id">
      <h2>{{ c.name }}</h2>

      <p v-if="c.items.length === 0">
        There is no items in this container. Let's create one with the "Add item" button above.
      </p>

      <div class="items-by-container">
        <template v-for="item in c.items" :key="item.id">
          <div class="item__quantity">{{ item.quantity }}</div>
          <div class="item__name">{{ item.name }}</div>
          <div class="item__material">{{ item.material?.name }}</div>
          <div class="item__duedate">{{ item.formattedDueDate }}</div>
          <div class="item__created">{{ item.formattedCreatedAt }}</div>
          <div class="item__updated">{{ item.formattedUpdatedAt }}</div>
          <div class="item__actions rst-button-group">
            <button @click="prepareToEditItem(item)" class="rst-button primary" type="button">
              Edit
            </button>
            <button @click="deleteItem(item)" class="rst-button danger" type="button">
              Delete
            </button>
          </div>
        </template>
      </div>
    </section>
  </main>

  <div v-else class="items-container">
    <template v-for="item in items" :key="item.id">
      <div class="item__container">{{ item.containerName }}</div>
      <div class="item__quantity">{{ item.quantity }}</div>
      <div class="item__name">{{ item.name }}</div>
      <div class="item__material">{{ item.material?.name }}</div>
      <div class="item__duedate">{{ item.formattedDueDate }}</div>
      <div class="item__created">{{ item.formattedCreatedAt }}</div>
      <div class="item__updated">{{ item.formattedUpdatedAt }}</div>
      <div class="item__actions rst-button-group">
        <button @click="prepareToEditItem(item)" class="rst-button primary" type="button">
          Edit
        </button>
        <button @click="deleteItem(item)" class="rst-button danger" type="button">Delete</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, type PropType } from 'vue'

import type {
  InventoryDetail,
  InventoryItem
} from '@al-un/ressaite-core/inventory/inventory.models'
import { formatDate } from '@/core/utils/datetime'

// ----------------------------------------------------------------------------

const props = defineProps({
  inventory: {
    type: Object as PropType<InventoryDetail>,
    required: true
  }
})

const emit = defineEmits(['prepareToEdit', 'delete'])

type State = {
  displayMode: 'container' | 'dueDate'
}

const state = reactive<State>({
  displayMode: 'container'
})

// ----------------------------------------------------------------------------

interface FormattedItem extends InventoryItem {
  containerId: number
  containerName: string
  formattedDueDate: string | null
  formattedCreatedAt: string | null
  formattedUpdatedAt: string | null
}

type ItemsByContainer = {
  id: number
  name: string
  items: FormattedItem[]
}

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

const itemsByContainers = computed<ItemsByContainer[]>(() => {
  if (props.inventory === null) {
    return []
  }

  const formattedItems = props.inventory.containers.map((container): ItemsByContainer => {
    const containerItems = container.items.map((i) => ({
      ...i,
      containerId: container.id,
      containerName: container.name,
      formattedDueDate: i.dueDate ? formatDate(i.dueDate) : null,
      formattedCreatedAt: i.createdAt ? formatDate(i.createdAt) : null,
      formattedUpdatedAt: i.updatedAt ? formatDate(i.updatedAt) : null
    }))

    return {
      id: container.id,
      name: container.name,
      items: containerItems
    }
  })

  return formattedItems
})

// ----------------------------------------------------------------------------

function prepareToEditItem(item: FormattedItem) {
  emit('prepareToEdit', item, item.containerId)
}

async function deleteItem(item: FormattedItem) {
  emit('delete', item.containerId, item.id)
}
</script>

<style lang="scss">
// .items-container {
//   display: grid;
//   grid-template-areas: 'container quantity name material duedate created updated actions';
//   align-items: center;
//   margin-block: 16px;

//   @include media('<tablet') {
//     grid-template-areas:
//       'quantity name material actions'
//       'duedate created updated actions';
//   }
// }

// .items__container {
//   grid-area: container;
// }
// .items__quantity {
//   grid-area: quantity;
// }
// .items__name {
//   grid-area: name;
// }
// .items__material {
//   grid-area: material;
// }
// .items__duedate {
//   grid-area: duedate;
// }
// .items__created {
//   grid-area: created;
// }
// .items__updated {
//   grid-area: updated;
// }
// .items__actions {
//   grid-area: actions;
// }
</style>
