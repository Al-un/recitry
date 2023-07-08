<template>
  <Teleport to="body">
    <div v-if="show" class="rst-modal">
      <div class="rst-modal-content" :class="{ padded }">
        <slot></slot>
      </div>
      <div @click="$emit('close')" class="rst-modal-backdrop"></div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps({
  show: { type: Boolean, required: true },
  padded: { type: Boolean, default: true }
})
defineEmits(['close'])
</script>

<style lang="scss">
.rst-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: $z-index-modal;
  display: grid;
  align-items: center;
  justify-items: center;

  @include media('<tablet') {
    align-items: end;
  }
}

.rst-modal-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
  }
}

.rst-modal-content {
  background-color: var(--rst-bg-content);
  border-radius: 8px;
  z-index: $z-index-modal + 1;

  &.padded {
    padding: 16px;
  }

  @include media('<tablet') {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-top: 16px;
    padding-bottom: 40px;
    width: 100%;
    align-items: end;
  }
}
</style>
