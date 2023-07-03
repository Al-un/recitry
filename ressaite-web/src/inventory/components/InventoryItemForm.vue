<template>
  <form @submit.prevent="submitForm" class="rst-form">
    <h2>Item form</h2>

    <RstInput v-model="formData.name" label="Name" required />
    <RstInput
      v-model="formData.quantity"
      label="Quantity"
      type="number"
      min="0"
      step="1"
      required
    />
    <RstInput v-model="formData.dueDate" label="Due date" type="date" />

    <select v-model="formData.containerId">
      <option v-for="c in containers" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
    <RstInput v-model="formData.containerId" label="Container" />

    <section>
      <button @click="$emit('cancel')" class="rst-button secondary" type="reset">Cancel</button>
      <button class="rst-button primary" type="submit">Save</button>
    </section>
  </form>
</template>

<script lang="ts" setup>
import { watch, type PropType } from 'vue'

import type {
  InventoryContainer,
  InventoryItemFormData
} from '@al-un/ressaite-core/inventory/inventory.models'
import RstInput from '@/core/components/ui/form/RstInput.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<InventoryItemFormData>, required: true },
  containers: { type: Array as PropType<InventoryContainer[]>, required: true }
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
