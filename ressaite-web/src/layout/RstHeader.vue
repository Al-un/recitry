<template>
  <header class="rst-header">
    <a href="/" class="rst-header__logo"> Ressaite </a>

    <div
      @click="$emit('menu:click')"
      class="rst-header__menu-toggler rst-hamburger"
      :class="{ active: showSidebar }"
    >
      <span></span>
    </div>

    <div class="flex-spacer rst-header__spacer"></div>

    <a v-if="!appStore.isAuthenticated" href="/login" class="rst-header__profile">Login</a>
    <div v-else class="rst-dropdown rst-header__profile">
      <div class="layout-my-profile">My profile</div>

      <ul class="rst-dropdown-content" style="background: magenta">
        <li @click="submitLogout">Logout</li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// ----------------------------------------------------------------------------
defineProps({
  showSidebar: {
    type: Boolean,
    default: true
  }
})

defineEmits(['menu:click'])

// ----------------------------------------------------------------------------

async function submitLogout() {
  await appStore.logout()
}
</script>

<style lang="scss">
@use './RstLayout.scss' as *;
@use 'sass:math';


.rst-header {
  @include flex-row;
  align-items: center;
  background-color: var(--rst-bg-content);
  height: $rst-layout-header-height;
  position: relative;
  z-index: $rst-sidebar-z-index;
}

.rst-header__logo {
  color: var(--rst-primary);
  width: $rst-sidebar-width;
  padding: math.div($rst-layout-header-height - 24px, 2);
  font-size: 16px;
  border-right: 1px solid var(--rst-primary);
  text-decoration: none;

  &:hover {
    background-color: var(--rst-bg-content-hover);
  }

  @include media('<tablet') {
    width: auto;
    border-right: none;
    order: 2;
  }
}

.rst-header__menu-toggler {
  @include rst-hamburger($rst-layout-header-height);

  @include media('<tablet') {
    order: 1;
  }
}

.rst-header__spacer {
  @include media('<tablet') {
    order: 3;
  }
}

.rst-header__profile {
  @include media('<tablet') {
    order: 4;
  }
}

.layout-my-profile {
  height: $rst-layout-header-height;
}
</style>
