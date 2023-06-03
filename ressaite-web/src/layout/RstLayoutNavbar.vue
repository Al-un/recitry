<template>
  <div
    @click="$emit('click:backdrop')"
    id="rst-navbar-backdrop"
    :class="{ 'show-navbar': showNavbar }"
  ></div>
  <nav id="rst-navbar" :class="{ 'show-navbar': showNavbar }"></nav>
</template>

<script lang="ts" setup>
const props = defineProps({
  showNavbar: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss">
@use './RstLayout.scss' as *;

#rst-navbar {
  background-color: var(--rst-bg-content);
  width: $rst-sidebar-width;
  max-width: 80%;
  z-index: $rst-sidebar-bg-z-index;
  height: 100%;
  margin-left: -$rst-sidebar-width;
  transition: margin-left 0.25s;

  &.show-navbar {
    margin-left: 0;
  }

  @include media('<tablet') {
    position: absolute;
  }
}

#rst-navbar-backdrop {
  display: none;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $rst-sidebar-bg-z-index;

  &.show-navbar {
    @include media('<tablet') {
      display: block;
    }
  }
}
</style>
