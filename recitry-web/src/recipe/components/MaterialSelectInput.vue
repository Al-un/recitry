<template>
  <div class="material-select-input">
    <div v-if="label" class="material-select-input__label">{{ label }}</div>

    <div class="material-select-input__display">
      <span v-if="modelValue">{{ modelValue.name }}</span>
      <span v-else>n/a</span>

      <div class="flex-spacer"></div>

      <button
        v-if="modelValue !== null"
        @click="$emit('update:model-value', null)"
        class="rst-button danger"
        type="button"
      >
        Delete
      </button>
      <button @click="showModal = !showModal" class="rst-button primary" type="button">Set</button>
    </div>
  </div>

  <RstModal @close="showModal = !showModal" :show="showModal">
    <RstInput v-model="materialSearch" label="Type to search material"></RstInput>

    <ul v-if="state.materials" class="rst-list selectable">
      <li v-for="m in state.materials" @click="selectMaterial(m)" class="rst-list-item" :key="m.id">
        {{ m.name }}
      </li>
    </ul>
  </RstModal>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { MaterialShortInfo } from '@al-un/ressaite-core/recipe/material.models'
import { callEndpoint } from '@/core/api'
import RstInput from '@/core/components/ui/form/RstInput.vue'
import RstModal from '@/core/components/ui/container/RstModal.vue'

// ----------------------------------------------------------------------------

type Props = {
  label: string | undefined
  modelValue: MaterialShortInfo | null
}

defineProps<Props>()
const emits = defineEmits(['update:model-value'])

// ----------------------------------------------------------------------------

const showModal = ref(false)
const materialSearch = ref('')
const searchFeedback = ref('')

interface State {
  materials: MaterialShortInfo[]
}

const state = reactive<State>({ materials: [] })

// ----------------------------------------------------------------------------

watch(materialSearch, async (newSearch, _) => {
  if (newSearch.length > 0) {
    searchFeedback.value = 'Searching...'
    const resp = await callEndpoint('materialSearch', null, {
      name: materialSearch.value,
      page: 1,
      limit: 20
    })

    if (resp.status === 200) {
      state.materials = resp.data.data
      searchFeedback.value = ''
    }

    if (state.materials.length === 0) {
      searchFeedback.value = 'No result found :('
    }
  } else {
    emits('update:model-value', null)
  }
})

// ----------------------------------------------------------------------------

function selectMaterial(m: MaterialShortInfo) {
  state.materials = []

  materialSearch.value = m.name
  emits('update:model-value', m)

  showModal.value = false
}
</script>

<style lang="scss">
// copied from .rst-input__label
.material-select-input__label {
  color: var(--rst-txt-sub);
  font-size: var(--rst-font-size-small);
  font-weight: bold;
  margin-bottom: 4px;
}

.material-select-input__display {
  display: flex;
}

.material-select__options-list {
  li {
    padding: 8px;
    border-top: 1px solid var(--rst-divider);

    &:hover {
      background-color: var(--rst-bg-content-hover);
      cursor: pointer;
    }
  }
}
</style>
