<template>
  <RstSelect
    label="Language"
    :options="options"
    :model-value="modelValue"
    @update:model-value="(payload) => $emit('update:modelValue', payload)"
  ></RstSelect>
</template>

<script lang="ts" setup>
import RstSelect from './RstSelect.vue'

defineProps({
  modelValue: { type: String, required: true }
})

defineEmits(['update:modelValue'])

const options = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'jp', label: '日本語' }
]
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
