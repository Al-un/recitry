<template>
  <div
    @click="$emit('click:backdrop')"
    id="rst-sidebar-backdrop"
    :class="{ 'show-sidebar': showSidebar }"
  ></div>
  <menu id="rst-sidebar" :class="{ 'show-sidebar': showSidebar }">
    <li><a href="/materials">Materials</a></li>
  </menu>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

defineEmits(['click:backdrop'])

const props = defineProps({
  showSidebar: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss">
@use './RstLayout.scss' as *;

#rst-sidebar {
  background-color: var(--rst-bg-content);
  width: $rst-sidebar-width;
  flex-shrink: 0;
  max-width: 80%;
  z-index: $rst-sidebar-bg-z-index;
  height: 100%;
  margin-top: 0; /** need to override a default value? */ 
  margin-left: -$rst-sidebar-width;
  padding: 0;
  transition: margin-left 0.25s;

  &.show-sidebar {
    margin-left: 0;
  }

  @include media('<tablet') {
    position: absolute;
  }

  li {
    border-top: 1px solid var(--rst-divider);
    transition: background-color 0.25s;

    &:last-of-type {
      border-bottom: 1px solid var(--rst-divider);
    }

    &:hover {
      background-color: var(--rst-bg-content-hover);
    }
  }
  a {
    display: flex;
    align-items: center;
    padding-inline-start: 16px;
    height: 36px;
  }
}

#rst-sidebar-backdrop {
  display: none;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $rst-sidebar-bg-z-index;

  &.show-sidebar {
    @include media('<tablet') {
      display: block;
    }
  }
}
</style>
