<template>
  <div class="material-select rst-dropdown">
    <RstInput v-model="materialSearch" type="search" :label="label">
      <p>{{ searchFeedback }}</p>
    </RstInput>
    <ul class="rst-dropdown-content materials-list">
      <li v-for="m in state.materials" @click="selectMaterial(m)" :key="m.id">
        {{ m.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { MaterialShortInfo } from '@al-un/ressaite-core/recipe/material.models'
import { callEndpoint } from '@/core/api'
import RstInput from '@/core/components/ui/form/RstInput.vue'

type Props = { label: string | undefined; modelValue: number | null }

const props = defineProps<Props>()
const emit = defineEmits(['update:model-value'])

const materialSearch = ref('')
const searchFeedback = ref('')

interface State {
  materials: MaterialShortInfo[]
}

const state = reactive<State>({ materials: [] })

watch(materialSearch, async (newSearch, _) => {
  if (newSearch.length > 0) {
    searchFeedback.value = 'Searching...'
    const resp = await callEndpoint('materialSearch', null, {
      name: materialSearch.value,
      page: 0,
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
    emit('update:model-value', null)
  }
})

onMounted(async () => {
  if (props.modelValue !== null) {
    const resp = await callEndpoint('materialDisplay', { materialId: props.modelValue })
    if (resp.status === 200) {
      const material = resp.data
      materialSearch.value = material.name
    }
  }
})

function selectMaterial(m: MaterialShortInfo) {
  state.materials = []
  materialSearch.value = m.name
  emit('update:model-value', m.id)
}
</script>

<style lang="scss">
.materials-list {
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
