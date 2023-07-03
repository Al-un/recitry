<template>
  <label class="rst-input">
    <div v-if="$attrs['label']" class="rst-input__label">{{ $attrs['label'] }}</div>
    <slot></slot>
    <input
      v-bind="$attrs"
      class="rst-input__input"
      :value="$attrs.modelValue"
      @input="$emit('update:modelValue', ($event?.target as any)?.value)"
    />
  </label>
</template>

<script lang="ts" setup>
/**
 * `($event?.target as any)?.value` used to make TypeScript highlighting happy
 */

// import { defineProps } from 'vue'

// defineProps({
//   title: {
//     type: String,
//     default: null
//   }
// })
</script>

<style lang="scss">
@forward './RstInput.scss';

.rst-input__label {
  color: var(--rst-txt-sub);
  font-size: var(--rst-font-size-small);
  font-weight: bold;
  margin-bottom: 4px;
}

.rst-input__input {
  background-color: var(--rst-bg-content);
  padding: 7px; // 8-1
  border: 1px solid var(--rst-divider);
  border-radius: 8px;
  width: 100%; // fill the label

  &:focus,
  &:focus-visible {
    border-color: var(--rst-primary);
    outline: none; // override default Firefox behaviour
  }
}
</style>
