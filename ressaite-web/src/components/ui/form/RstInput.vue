<template>
  <input
    v-bind="$attrs"
    :value="$attrs.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts" setup>
</script>
