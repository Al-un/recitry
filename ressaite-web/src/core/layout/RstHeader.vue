<template>
  <header class="rst-header">
    <a href="/" class="rst-header__logo"> Recitry </a>

    <div
      @click="$emit('menu:click')"
      class="rst-header__menu-toggler rst-hamburger"
      :class="{ active: showSidebar }"
    >
      <span></span>
    </div>

    <div class="flex-spacer rst-header__spacer"></div>

    <div v-if="!authStore.isAuthenticated" class="rst-header__login">
      <a href="/login" class="rst-button secondary">Login</a>
    </div>
    <div v-else class="rst-dropdown rst-header__profile">
      <div class="layout-my-profile">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>

      <ul class="rst-dropdown-content">
        <li @click="submitLogout">Logout</li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/um/stores/auth'

const authStore = useAuthStore()

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
  await authStore.logout()
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

.rst-header__login,
.rst-header__profile {
  @include media('<tablet') {
    order: 4;
  }
}

.rst-header__login {
  padding-inline: 16px;
}

.rst-header__profile {
  width: $rst-layout-header-height;
  height: $rst-layout-header-height;

  &:hover {
    background-color: var(--rst-bg-content-hover);
  }

  .rst-dropdown-content {
    right: 0;
    width: 180px;

    li {
      padding: 8px 16px;

      &:hover {
        background-color: var(--rst-bg-content-hover);
        cursor: pointer;
      }
    }
  }
}

.layout-my-profile {
  @include flex-col;
  align-items: center;
  justify-content: center;
  width: $rst-layout-header-height;
  height: $rst-layout-header-height;

  span.dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--rst-primary);
  }

  span.dot + span.dot {
    margin-block-start: 4px;
  }
}
</style>
