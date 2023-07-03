<template>
  <label class="rst-select-lang">
    <div v-if="$attrs['label']" class="rst-select-lang__label">{{ $attrs['label'] }}</div>
    <slot></slot>
    <select @change="(event) => $emit('update:modelValue', (event.target as any).value)" class="rst-select">
      v-bind="$attrs"
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="jp">日本語</option>
    </select>
  </label>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps({
  modelValue: { type: String, required: true }
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss">
/* .rst-input__label, */
.rst-select-lang__label {
  color: var(--rst-txt-sub);
  font-size: var(--rst-font-size-small);
  font-weight: bold;
  margin-bottom: 4px;
}

.rst-select-lang {
  select {
    width: 100%;
  }
}
</style>
