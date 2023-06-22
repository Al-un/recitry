<template>
  <form @submit.prevent="submitForm">
    <h2>Material form</h2>

    <section>
      <RstInput v-model="materialForm.name" label="Name" />
      <RstInput v-model="materialForm.lang" label="Lang" />
    </section>

    <section>
      <button @click="$emit('cancel')" class="rst-button secondary" type="reset">Cancel</button>
      <button class="rst-button primary" type="submit">Save</button>
    </section>
  </form>
</template>

<script lang="ts" setup>
import { watch, type PropType } from 'vue'

import type { MaterialCreation } from '@al-un/ressaite-core/recipe/material.models'
import RstInput from '@/components/ui/form/RstInput.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<MaterialCreation>, required: true }
})
const emits = defineEmits(['update:modelValue', 'cancel'])

let materialForm!: MaterialCreation

/**
 * @see https://eslint.vuejs.org/rules/no-setup-props-destructure.html
 */
watch(
  () => props.modelValue,
  () => {
    materialForm = props.modelValue
  },
  { immediate: true }
)

function submitForm() {
  emits('update:modelValue')
}
</script>

<style lang="scss"></style>
