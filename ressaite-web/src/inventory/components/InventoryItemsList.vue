<template>
  <main v-if="inventory.containers.length === 0" class="rst-card padded">
    There is no container at the moment, let's create one in the Inventory settings.
  </main>
  <div v-else>
    Display mode:
    <RstSelect
      v-model="state.displayMode"
      :options="[
        { value: 'container', label: 'By container' },
        { value: 'dueDate', label: 'By due date' }
      ]"
    />
  </div>

  <main v-if="state.displayMode === 'container'">
    <section v-for="c in itemsByContainers" :key="c.id" class="rst-card padded rst-page-section">
      <h2>{{ c.name }}</h2>

      <p v-if="c.items.length === 0">
        There is no items in this container. Let's create one with the "Add item" button above.
      </p>

      <div class="items-by-container rst-list">
        <div v-for="item in c.items" :key="item.id" class="rst-list-item">
          <div class="item__name">{{ item.name }}</div>
          <div class="item__quantity">x {{ item.quantity }}</div>
          <div class="item__material">{{ item.material?.name }}</div>
          <div class="item__duedate">{{ item.formattedDueDate }}</div>
          <!-- <div class="item__created">{{ item.formattedCreatedAt }}</div>
          <div class="item__updated">{{ item.formattedUpdatedAt }}</div> -->
          <div class="item__actions rst-button-group">
            <button @click="prepareToEditItem(item)" class="rst-button primary" type="button">
              Edit
            </button>
            <button @click="deleteItem(item)" class="rst-button danger" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main v-else-if="state.displayMode === 'dueDate'">
  </main>
  <!-- <div v-else class="items-container">
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
  </div> -->
</template>

<script lang="ts" setup>
import { computed, reactive, type PropType } from 'vue'

import type {
  InventoryDetail,
  InventoryItem
} from '@al-un/ressaite-core/inventory/inventory.models'
import RstSelect from '@/core/components/ui/form/RstSelect.vue'
import { formatDate } from '@/core/utils/datetime'

// ----------------------------------------------------------------------------

const props = defineProps({
  inventory: {
    type: Object as PropType<InventoryDetail>,
    required: true
  }
})

const emit = defineEmits(['prepare-to-edit', 'delete'])

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

const itemsByDueDate = computed<FormattedItem[]>(() => {
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
  emit('prepare-to-edit', item, item.containerId)
}

async function deleteItem(item: FormattedItem) {
  emit('delete', item.containerId, item.id)
}
</script>

<style lang="scss">
.items-by-container {
  @include generate-grid-areas(
    'item__name',
    'item__quantity',
    'item__material',
    'item__duedate',
    'item__actions'
  );
  .rst-list-item {
    display: grid;
    grid-template-areas: 'item__name item__quantity item__material item__duedate item__actions';
    grid-template-columns: repeat(5, 1fr);

    @include media('<tablet') {
      grid-template-areas:
        'item__name item__name item__quantity'
        'item__duedate item__actions item__actions';
      grid-template-columns: 1fr 1fr max-content;
      gap: 8px 0;
    }
  }

  .item__duedate {
    @include media('<tablet') {
      color: var(--rst-txt-sub);
    }
  }

  .item__material {
    @include media('<tablet') {
      display: none;
    }
  }
}
</style>
