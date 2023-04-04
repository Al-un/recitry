<template>
  <div class="layout-page">
    <nav class="layout-navigation">
      <a href="/">Home</a>
      <div class="flex-spacer"></div>
      <span>{{ appStore.isAuthenticated }}</span>
      <a v-if="!appStore.isAuthenticated" href="/login">Login</a>
      <div v-else class="rst-dropdown">
        <div class="layout-my-profile">My profile</div>

        <ul class="rst-dropdown-content" style="background: magenta">
          <li @click="submitLogout">Logout</li>
        </ul>
      </div>
    </nav>

    <main class="layout-content"><slot></slot></main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

onMounted(async () => {
  console.log('Layout LOADED!!')

  await fetch("http://localhost:8000/v1/health", {
    method: "GET"
  })
})

async function submitLogout() {
  await appStore.logout()
}
</script>

<style lang="scss">
$nav-header-height: 40px;

.layout-page {
  width: 100vw;
  height: 100vh;
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
</style>
