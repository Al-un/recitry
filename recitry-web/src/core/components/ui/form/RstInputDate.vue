<template>
  <RstInput
    type="date"
    pattern="\d{4}-\d{2}-\d{2}"
    :model-value="inputValue"
    @update:model-value="onUpdate"
  />
</template>

<script lang="ts" setup>
// pattern="\d{4}-\d{2}-\d{2}"
// used for browsers not support type="date"

import { computed } from 'vue'
import RstInput from './RstInput.vue'

interface Props {
  modelValue: string | Date | null
}

const props = defineProps<Props>()

const emits = defineEmits(['update:model-value'])

const inputValue = computed(() => {
  if (props.modelValue === null) {
    return undefined // RstInput not handling null
  }

  const outputLength = 'YYYY-MM-dd'.length

  // new Date() is an object
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#examples
  if (typeof props.modelValue === 'object') {
    return props.modelValue.toISOString().substring(0, outputLength)
  }

  try {
    return new Date(props.modelValue).toISOString().substring(0, outputLength)
  } catch {
    // If the input date is invalid, either by clearing the date by
    // manually erasing the day or month or year value, the date cannot
    // be built
    return undefined // RstInput not handling null
  }
})

function onUpdate(newValue: string) {
  emits('update:model-value', newValue)
}
</script>
