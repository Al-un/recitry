<template>
  <div class="central-aligned-page">
    <header class="materials__header">
      <h1>{{ $t('material.list.title') }}</h1>
      <button
        v-if="authStore.isAuthenticated"
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
        <rst-input v-model="materialSearch" placeholder="Search material name" />
        <button class="rst-button primary" type="submit">Search</button>
      </form>

      <pre v-if="state.loading">LOADING...</pre>
      <template v-else-if="state.list.length">
        <ul class="rst-list materials-list">
          <li v-for="material in state.list" :key="material.id" class="rst-list-item">
            <span class="material-table__name">{{ material.name }}</span>
            <span class="flex-spacer"></span>
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
          </li>
        </ul>

        <RstPaginationButtons
          :pagination="pagination"
          @load-prev="pagination.loadPrev"
          @load-next="pagination.loadNext"
        />
      </template>
      <div v-else class="materials-no-result">No result :(</div>
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
import { callEndpoint, type CallEndpointResponse } from '@/core/api'
import RstInput from '@/core/components/ui/form/RstInput.vue'
import RstModal from '@/core/components/ui/container/RstModal.vue'
import RstPaginationButtons from '@/core/components/ui/control/RstPaginationButtons.vue'
import MaterialForm from '@/recipe/components/MaterialForm.vue'
import { useAuthStore } from '@/um/stores/auth'
import { usePagination } from '@/core/compositions/use-pagination'
import type { WithPagination } from '@al-un/ressaite-core/core/base-api.endpoints'

const authStore = useAuthStore()

interface State {
  list: Material[]
  // pagination: {
  //   currentPage: number
  //   limit: number
  //   totalCount: number | null
  // }
  loading: boolean
  materialForm: MaterialFormData | null
}

const materialSearch = ref('')
const state = reactive<State>({
  list: [],
  loading: false,
  // pagination: { currentPage: 1, limit: 100, totalCount: null },
  materialForm: null
})

const pagination = usePagination<Material>(async ({ page, limit }: WithPagination) => {
  const resp = await callEndpoint('materialSearch', null, {
    name: materialSearch.value || '',
    page: page,
    limit: limit
  })

  state.list = resp.data.data
  return resp
})
pagination.paginationState.limit = 10

onMounted(async () => {
  await pagination.loadData()
  // await searchMaterial(pagination)
})

function canManage(material: Material): boolean {
  return material.author.id === authStore.sessionInfo?.user.id
}

async function searchMaterial() {
  pagination.paginationState.currentPage = 1
  await pagination.loadData()
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
    }
  } else {
    resp = await callEndpoint('materialCreate', null, state.materialForm)
    if (resp.status === 201) {
      //
      state.list.unshift(resp.data)
      state.list = state.list.slice(0, 10)

      if (pagination.paginationState.totalCount) {
        pagination.paginationState.totalCount++
      }
    }
  }

  state.materialForm = null
  state.loading = false
  stopForm()
}

async function deleteMaterial(material: Material) {
  state.loading = true
  const res = await callEndpoint('materialDelete', { materialId: material.id }, null)
  if (res.status === 204) {
    state.list = state.list.filter((m) => m.id !== material.id)

    if (pagination.paginationState.totalCount) {
      pagination.paginationState.totalCount--
    }
  }
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
  justify-content: center;
  .rst-input {
    margin-inline-end: 8px;
  }
}

.rst-list-item {
  .rst-button + .rst-button {
    margin-inline-start: 8px;
  }
}

.materials-list {
  margin-block-start: 16px;
}

.materials-no-result {
  text-align: center;
  padding-block: 16px;
}
</style>
