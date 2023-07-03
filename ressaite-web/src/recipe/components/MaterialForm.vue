<template>
  <form @submit.prevent="submitForm" class="rst-form material-form">
    <h2>Material form</h2>

    <RstInput v-model="materialForm.name" label="Name" class="material-name" />
    <RstSelectLang v-model="materialForm.lang" label="Language" class="material-lang" />

    <button @click="$emit('cancel')" class="rst-button secondary" type="reset">Cancel</button>
    <button class="rst-button primary" type="submit">Save</button>
  </form>
</template>

<script lang="ts" setup>
import { watch, type PropType } from 'vue'

import type { MaterialFormData } from '@al-un/ressaite-core/recipe/material.models'
import RstInput from '@/core/components/ui/form/RstInput.vue'
import RstSelectLang from '@/core/components/ui/form/RstSelectLang.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<MaterialFormData>, required: true }
})
const emits = defineEmits(['update:modelValue', 'cancel'])

let materialForm!: MaterialFormData

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
  emits('update:modelValue', materialForm)
}
</script>

<style lang="scss"></style>
