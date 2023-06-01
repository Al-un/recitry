<template>
  <div class="central-aligned-page">
    <h2>{{ $t('materials.list.title') }}</h2>

    <div>
      <rst-input-search v-model="materialSearch" />
      <button @click="searchMaterial" class="rst-button primary">???Search!</button>
    </div>

    <pre>{{ state.loading }}</pre>

    <div>
      <div v-for="m in state.list" :key="m.id">
        <div>{{ m.name }}</div>
        <button v-if="canDelete(m)" @click="deleteMaterial(m)">???Delete</button>
      </div>
    </div>

    <div>
      <rst-input v-model="newMaterial.name" />
      <button @click="createMaterial" class="rst-button primary">???Create!</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import RstInput from '@/components/ui/form/RstInput.vue'
import RstInputSearch from '@/components/ui/form/RstInputSearch.vue'
import { callEndpoint } from '@/api'
import type { Material, MaterialCreation } from '@al-un/ressaite-core/recipe/material.models'

interface State {
  list: Material[]
  pagination: {
    currentPage: number
    limit: number
    totalCount: number | null
  }
  loading: boolean
}

const materialSearch = ref('')
const newMaterial = reactive<MaterialCreation>({
  name: 'Material name',
  lang: 'fr'
})
const state = reactive<State>({
  list: [],
  loading: false,
  pagination: { currentPage: 1, limit: 1000, totalCount: null }
})

function canDelete(material: Material): boolean {
  return true
}

async function createMaterial() {
  state.loading = true
  const res = await callEndpoint('materialCreate', null, {
    name: newMaterial.name,
    lang: newMaterial.lang
  })

  if (res.status === 201) {
    state.list.push(res.data)
  }
  state.loading = false
}

async function deleteMaterial(material: Material) {
  state.loading = true
  const res = await callEndpoint('materialDelete', { materialId: material.id }, null)

  if (res.status === 204) {
    state.list = state.list.filter((m) => m.id !== material.id)
  }
  state.loading = false
}

async function searchMaterial() {
  state.loading = true
  const res = await callEndpoint('materialSearch', null, {
    name: materialSearch.value || '',
    page: state.pagination.currentPage,
    limit: state.pagination.limit
  })

  state.list = res.data.data
  state.loading = false
}
</script>

<style lang="scss"></style>
