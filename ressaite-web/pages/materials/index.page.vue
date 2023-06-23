<template>
  <div class="central-aligned-page">
    <header class="materials__header">
      <h1>{{ $t('materials.list.title') }}</h1>
      <button
        v-if="appStore.isAuthenticated"
        @click="prepareToCreate"
        class="rst-button primary"
        type="button"
      >
        Add
      </button>
    </header>

    <p>
      This page lists all the materials available in this application. Only the person who created a
      material can edit or delete a material. If a material is used in an inventory, it cannot be
      deleted: please have the related inventory items deleted before.
    </p>

    <section class="rst-card padded">
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
        </div>
      </div>
    </section>
  </div>

  <RstModal v-if="state.materialForm" :show="state.materialForm !== null">
    <material-form
      @cancel="stopForm"
      @update:model-value="saveMaterial"
      :model-value="state.materialForm"
    />
  </RstModal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import type { Material, MaterialFormData } from '@al-un/ressaite-core/recipe/material.models'
import { callEndpoint, type CallEndpointResponse } from '@/api'
import RstInput from '@/components/ui/form/RstInput.vue'
import { useAppStore } from '@/stores/app'
import RstModal from '@/components/ui/container/RstModal.vue'
import MaterialForm from '@/components/recipe/MaterialForm.vue'

const appStore = useAppStore()

interface State {
  list: Material[]
  pagination: {
    currentPage: number
    limit: number
    totalCount: number | null
  }
  materialForm: MaterialFormData | null
  loading: boolean
}

const materialSearch = ref('')
const state = reactive<State>({
  list: [],
  loading: false,
  pagination: { currentPage: 1, limit: 1000, totalCount: null },
  materialForm: null
})

onMounted(async () => {
  await searchMaterial()
})

function canManage(material: Material): boolean {
  return material.author.id === appStore.sessionInfo?.user.id
}

function prepareToCreate() {
  state.materialForm = {
    id: null,
    name: '',
    lang: 'fr'
  }
}

function prepareToEditMaterial(material: Material) {
  state.materialForm = {
    ...material
  }
}

function stopForm() {
  state.materialForm = null
}

async function saveMaterial() {
  if (state.materialForm === null) {
    return
  }
  state.loading = true

  let resp: CallEndpointResponse<Material>
  if (state.materialForm.id) {
    resp = await callEndpoint(
      'materialUpdate',
      { materialId: state.materialForm.id },
      state.materialForm
    )

    if (resp.status === 200) {
      state.list = state.list.map((m) => {
        if (m.id !== state.materialForm?.id) {
          return m
        }

        return resp.data
      })
      state.materialForm = null
    }
  } else {
    resp = await callEndpoint('materialCreate', null, state.materialForm)
    if (resp.status === 201) {
      state.list.push(resp.data)
    }
  }

  state.loading = false
  stopForm()
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
.materials__header {
  // same as .inventory__header
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 16px;
}

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
  width: 10%;

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
