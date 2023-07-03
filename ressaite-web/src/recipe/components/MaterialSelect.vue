<template>
  <div class="rst-dropdown">
    <RstInput v-model="materialSearch" type="search" />

    <ul class="rst-dropdown-content materials-list">
      <li v-for="m in state.materials" @click="selectMaterial(m)" :key="m.id">
        {{ m.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { MaterialShortInfo } from '@al-un/ressaite-core/recipe/material.models'
import { callEndpoint } from '@/core/api'
import RstInput from '@/core/components/ui/form/RstInput.vue'

const emit = defineEmits(['update:modelValue'])

const materialSearch = ref('')

interface State {
  materials: MaterialShortInfo[]
}

const state = reactive<State>({ materials: [] })

watch(materialSearch, async (newSearch, _) => {
  if (newSearch.length > 0) {
    const resp = await callEndpoint('materialSearch', null, {
      name: materialSearch.value,
      page: 0,
      limit: 50
    })

    if (resp.status === 200) {
      state.materials = resp.data.data
    }
  }
})

function selectMaterial(m: MaterialShortInfo) {
  state.materials = []
  materialSearch.value = m.name
  emit('update:modelValue', m.id)
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
