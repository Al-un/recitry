<template>
  <rst-header @menu:click="showSidebar = !showSidebar" :show-sidebar="showSidebar" />

  <div class="rst-layout__content__container">
    <rst-layout-navbar
      @click:backdrop="showSidebar = !showSidebar"
      :show-sidebar="showSidebar"
    ></rst-layout-navbar>

    <!-- <main class="rst-layout__content__slot"> -->
    <slot></slot>
    <!-- </main> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import RstHeader from './RstHeader.vue'
import RstLayoutNavbar from './RstLayoutNavbar.vue'

import { useAppStore } from '@/stores/app'
import { callEndpoint } from '@/api'

const appStore = useAppStore()

const showSidebar = ref<boolean>(false)

onMounted(async () => {
  await callEndpoint('health', null, null)
  await appStore.loadSessionInfo()
})
</script>

<style lang="scss">
@use './RstLayout.scss' as *;
@use 'sass:math';

/**
.rst-layout__content__slot {
  flex-grow: 1;
  // overflow: auto; // duplicate with parent overflow
}
 */

.rst-layout__content__container {
  @include flex-row;

  background-color: var(--rst-bg-app);
  height: calc(100% - #{$rst-layout-header-height});
  overflow: hidden;
}
</style>
