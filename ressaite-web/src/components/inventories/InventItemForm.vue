<template>
  <form @submit.prevent="submitForm">
    <h2>Item form</h2>

    <section>
      <RstInput v-model="formData.name" label="Name" />
    </section>

    <section>
      <button @click="$emit('cancel')" class="rst-button secondary" type="reset">Cancel</button>
      <button class="rst-button primary" type="submit">Save</button>
    </section>
  </form>
</template>

<script lang="ts" setup>
import { watch, type PropType } from 'vue'

import type { InventoryItemFormData } from '@al-un/ressaite-core/inventory/inventory.models'
import RstInput from '@/components/ui/form/RstInput.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<InventoryItemFormData>, required: true }
})
const emits = defineEmits(['update:modelValue', 'cancel'])

let formData!: InventoryItemFormData

watch(
  () => props.modelValue,
  () => {
    formData = props.modelValue
  },
  { immediate: true }
)

function submitForm() {
  emits('update:modelValue', formData)
}
</script>

<style lang="scss"></style>
