<template>
  <!-- <div class="rst-layout" :class="{ 'show-sidenavbar': showSideNavBar }"> -->
  <header class="rst-layout__header">
    <!-- To add a logo here :) -->
    <div @click="showSideNavBar = !showSideNavBar">Menu</div>
    <a href="/" class="temporary-logo"> Ressaite </a>

    <div class="flex-spacer"></div>

    <rst-input-search v-model="recipeSearch" placeholder="Search a recipe here" />

    <div class="flex-spacer"></div>

    <!-- To add a logo here :) -->
    <a v-if="!appStore.isAuthenticated" href="/login" class="temporary-login">Login</a>
    <div v-else class="rst-dropdown">
      <div class="layout-my-profile">My profile</div>

      <ul class="rst-dropdown-content" style="background: magenta">
        <li @click="submitLogout">Logout</li>
      </ul>
    </div>
  </header>

  <div class="rst-layout__content__container">
    <rst-layout-navbar
      @click:backdrop="showSideNavBar = !showSideNavBar"
      :showNavbar="showSideNavBar"
    ></rst-layout-navbar>

    <main class="rst-layout__content__slot">
      <slot></slot>
    </main>
  </div>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import RstLayoutNavbar from './RstLayoutNavbar.vue'

import RstInputSearch from '@/components/ui/form/RstInputSearch.vue'
import { useAppStore } from '@/stores/app'
import { callEndpoint } from '@/api'

const appStore = useAppStore()

const recipeSearch = ref('')
const showSideNavBar = ref<boolean>(false)

onMounted(async () => {
  callEndpoint('health', null, null)
})

async function submitLogout() {
  await appStore.logout()
}
</script>

<style lang="scss">
@use './RstLayout.scss' as *;
@use 'sass:math';

.rst-layout__header {
  @include flex-row;
  background-color: var(--rst-bg-content);
  height: $rst-layout-header-height;
  position: relative;
  border-bottom: 1px solid black;
  z-index: $rst-sidebar-z-index;
}

.rst-layout__content__slot {
  height: 100%;
  flex-grow: 1;
  // overflow: auto; // duplicate with parent overflow
}

.layout-my-profile {
  height: $rst-layout-header-height;
}

.temporary-logo {
  color: var(--rst-primary);
  width: $rst-sidebar-width;
  padding: math.div($rst-layout-header-height - 24px, 2);
  font-size: 16px;
  border-right: 1px solid var(--rst-primary);
  text-decoration: none;

  &:hover {
    background-color: lightcoral;
  }
}

.temporary-login {
  width: 120px;
  padding: math.div($rst-layout-header-height - 24px, 2);
  font-size: 16px;
  border-left: 1px solid var(--rst-primary);
  text-align: right;
  text-decoration: none;

  &:hover {
    background-color: lightcoral;
  }
}

.rst-layout__content__container {
  @include flex-row;

  background-color: var(--rst-bg-app);
  height: calc(100% - #{$rst-layout-header-height});
  overflow: auto;
}
</style>
