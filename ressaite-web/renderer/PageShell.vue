<template>
  <div class="layout-page" :class="{ 'show-sidenavbar': showSideNavBar }">
    <nav class="layout-navigation">
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
    </nav>

    <nav id="sidenavbar"></nav>

    <div class="sidenavbar-background"></div>
    <main class="layout-content">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

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
@use 'sass:math';

$nav-header-height: 40px;

.layout-page {
  background-color: var(--rst-bg-app);
  width: 100vw;
  height: 100vh;

  &.show-sidenavbar {
    #sidenavbar {
    }
  }
}

.layout-navigation {
  @include flex-row;
  height: $nav-header-height;
  border-bottom: 1px solid black;
}

.layout-content {
  height: calc(100% - $nav-header-height);
}

.layout-my-profile {
  height: $nav-header-height;
}

.temporary-logo {
  color: var(--rst-primary);
  width: 200px;
  padding: math.div($nav-header-height - 24px, 2);
  font-size: 16px;
  border-right: 1px solid var(--rst-primary);
  text-decoration: none;

  &:hover {
    background-color: lightcoral;
  }
}

.temporary-login {
  width: 120px;
  padding: math.div($nav-header-height - 24px, 2);
  font-size: 16px;
  border-left: 1px solid var(--rst-primary);
  text-align: right;
  text-decoration: none;

  &:hover {
    background-color: lightcoral;
  }
}
</style>
