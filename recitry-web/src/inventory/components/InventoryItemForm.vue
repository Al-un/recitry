<template>
  <form @submit.prevent="submitForm" class="rst-form inventory-item-form">
    <h1>Inventory item</h1>

    <RstInput v-model="formData.name" label="Item name" required />
    <RstInput
      v-model.number="formData.quantity"
      label="Quantity"
      type="number"
      min="0"
      step="1"
      required
    />
    <RstInputDate v-model="formData.dueDate" label="Due date" />

    <RstSelect
      v-model.number="formData.containerId"
      :options="containerOptions"
      label="Container"
      required
    />

    <MaterialSelectInput v-model="formData.material" label="Material" />

    <section>
      <button @click="$emit('cancel')" class="rst-button secondary" type="reset">Cancel</button>
      <button class="rst-button primary" type="submit">Save</button>
    </section>
  </form>
</template>

<script lang="ts" setup>
import { watch, type PropType, computed } from 'vue'

import type {
  InventoryContainer,
  InventoryItemFormData
} from '@al-un/recitry-core/inventory/inventory.models'
import RstInput from '@/core/components/ui/form/RstInput.vue'
import RstInputDate from '@/core/components/ui/form/RstInputDate.vue'
import RstSelect from '@/core/components/ui/form/RstSelect.vue'
import MaterialSelectInput from '@/recipe/components/MaterialSelectInput.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<InventoryItemFormData>, required: true },
  containers: { type: Array as PropType<InventoryContainer[]>, required: true }
})
const emits = defineEmits(['update:modelValue', 'cancel'])

let formData!: InventoryItemFormData

watch(
  () => props.modelValue,
  () => (formData = props.modelValue),
  { immediate: true }
)

const containerOptions = computed(() => {
  return props.containers.map((c) => ({ value: c.id, label: c.name }))
})

function submitForm() {
  emits('update:modelValue', formData)
}
</script>

<style lang="scss">
.inventory-item-form {
  width: 100vw;
  max-width: 400px;
}
</style>
