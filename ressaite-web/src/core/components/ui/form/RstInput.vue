<template>
  <label class="rst-input">
    <div v-if="$attrs['label']" class="rst-input__label">{{ $attrs['label'] }}</div>
    <slot></slot>
    <input
      v-bind="$attrs"
      class="rst-input__input"
      ref="input"
      :value="modelValue"
      @input="$emit('update:model-value', ($event?.target as any)?.value)"
    />
  </label>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

/**
 * `($event?.target as any)?.value` used to make TypeScript highlighting happy
 */

const input = ref<HTMLInputElement | null>(null)

defineProps({ modelValue: { type: [String, Number], default: null } })
defineEmits(['update:model-value'])

function focusInput() {
  input.value?.focus()
}

// Expose focus function for parent components:
// https://vuejs.org/guide/essentials/template-refs.html#ref-on-component
defineExpose({ focusInput })
</script>

<style lang="scss">
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
