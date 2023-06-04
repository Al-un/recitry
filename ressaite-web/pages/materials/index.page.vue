<template>
  <div class="central-aligned-page">
    <h1>{{ $t('materials.list.title') }}</h1>

    <p>
      This page lists all the materials available in this application. Only the person who created a
      material can edit or delete a material. If a material is used in an inventory, it cannot be
      deleted: please have the related inventory items deleted before.
    </p>

    <section class="rst-card padded">
      <h2>Searching material</h2>

      <form @submit.prevent="searchMaterial" class="material-search-form">
        <rst-input v-model="materialSearch" label="Search material name" />
        <button class="rst-button primary" type="submit">Search</button>
      </form>

      <pre v-if="state.loading">LOADING...</pre>
      <div v-if="state.list.length" class="rst-table">
        <div class="rst-table-row">
          <div class="material-table__id">Id</div>
          <div class="material-table__name">Name</div>
          <div class="material-table__lang">Lang</div>
          <div class="material-table__action"></div>
        </div>

        <div v-for="material in state.list" :key="material.id" class="rst-table-row">
          <div class="material-table__id">{{ material.id }}</div>
          <template v-if="state.editMaterial?.id === material.id">
            <div class="material-table__name">
              <rst-input v-model="state.editMaterial.name" />
            </div>
            <div class="material-table__lang">
              <rst-input v-model="state.editMaterial.lang" />
            </div>
            <div class="material-table__action">
              <button @click="cancelEdit" class="rst-button secondary">Cancel</button>
              <button @click="editMaterial" class="rst-button primary">Edit</button>
            </div>
          </template>
          <template v-else>
            <div class="material-table__name">{{ material.name }}</div>
            <div class="material-table__lang">{{ material.lang }}</div>
            <div class="material-table__action">
              <button
                v-if="canManage(material)"
                @click="prepareToEditMaterial(material)"
                class="rst-button primary"
              >
                Edit
              </button>
              <button
                v-if="canManage(material)"
                @click="deleteMaterial(material)"
                class="rst-button danger"
              >
                Delete
              </button>
            </div>
          </template>
        </div>
      </div>
    </section>

    <section class="rst-card padded">
      <h2>Create a new material</h2>
      <form @submit.prevent="createMaterial" class="material-create-form">
        <rst-input v-model="newMaterial.name" label="Material name" />
        <rst-input v-model="newMaterial.lang" label="Language" />
        <button class="rst-button primary" type="submit">Create</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import RstInput from '@/components/ui/form/RstInput.vue'
import { callEndpoint } from '@/api'
import type { Material, MaterialCreation } from '@al-un/ressaite-core/recipe/material.models'

interface State {
  list: Material[]
  pagination: {
    currentPage: number
    limit: number
    totalCount: number | null
  }
  editMaterial: Material | null
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
  pagination: { currentPage: 1, limit: 1000, totalCount: null },
  editMaterial: null
})

onMounted(async () => {
  await searchMaterial()
})

function canManage(material: Material): boolean {
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

function prepareToEditMaterial(material: Material) {
  state.editMaterial = material
}

function cancelEdit() {
  state.editMaterial = null
}

async function editMaterial() {
  if (state.editMaterial === null) {
    return
  }

  const res = await callEndpoint(
    'materialUpdate',
    { materialId: state.editMaterial.id },
    state.editMaterial
  )

  if (res.status === 200) {
    state.list = state.list.map((m) => {
      if (m.id !== state.editMaterial?.id) {
        return m
      }

      return res.data
    })
    state.editMaterial = null
  }
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

<style lang="scss">
.material-search-form {
  @include flex-row;
  .rst-input-search {
    flex-grow: 1;
    margin-right: 8px;
  }
}

.material-create-form {
  @include flex-row;
  .rst-input {
    flex-grow: 1;
    margin-right: 8px;
  }
}

.material-table__id {
  width: 10%;

  @include media('<tablet') {
    width: 10%;
  }
}
.material-table__name {
  width: 60%;

  @include media('<tablet') {
    width: 80%;
  }
}
.material-table__lang {
  width: 100%;

  @include media('<tablet') {
    width: 10%;
  }
}
.material-table__action {
  width: 20%;

  @include media('<tablet') {
    width: 100%;
  }
}
</style>
