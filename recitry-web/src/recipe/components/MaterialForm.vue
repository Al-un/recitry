<template>
  <form @submit.prevent="submitForm" class="rst-form material-form">
    <h1 class="main-title">Material form</h1>

    <h2 class="core-info-title">Core information</h2>
    <RstInput
      ref="material-name-input"
      v-model="materialForm.name"
      label="Name"
      class="material-name"
    />
    <RstSelectLang v-model="materialForm.lang" label="Language" class="material-lang" />

    <h2 class="transactions-title">Translations</h2>
    <p class="to-come-later">To come later...</p>

    <div></div>
    <button @click="$emit('cancel')" class="rst-button secondary" type="reset">Cancel</button>
    <button class="rst-button primary" type="submit">Save</button>
  </form>
</template>

<script lang="ts" setup>
import { watch, type PropType, onMounted, ref } from 'vue'

import type { MaterialFormData } from '@al-un/recitry-core/recipe/material.models'
import RstInput from '@/core/components/ui/form/RstInput.vue'
import RstSelectLang from '@/core/components/ui/form/RstSelectLang.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<MaterialFormData>, required: true }
})
const emits = defineEmits(['update:modelValue', 'cancel'])

let materialForm!: MaterialFormData
const materialNameInput = ref<typeof RstInput | null>(null)

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

/** @todo: not working :( */
onMounted(() => {
  materialNameInput.value?.focusInput()
})

function submitForm() {
  emits('update:modelValue', materialForm)
}
</script>

<style lang="scss">
.material-form {
  grid-template-columns: repeat(3, 1fr);

  .material-name {
    grid-column: span 2;
  }

  h1,
  h2,
  .to-come-later {
    grid-column: span 3;
  }
}
</style>
