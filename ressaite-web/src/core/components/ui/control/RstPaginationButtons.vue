<template>
  <div class="rst-button-group rst-pagination-buttons">
    <button
      :disabled="!pagination.hasPrev"
      @click="$emit('load-prev')"
      class="rst-button secondary"
    >
      Prev
    </button>
    <span>{{ pagination.state.currentPage }} / {{ pagination.lastPage }}</span>
    <button
      :disabled="!pagination.hasNext"
      @click="$emit('load-next')"
      class="rst-button secondary"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { usePagination } from '@/core/compositions/use-pagination'

defineProps({
  pagination: {
    type: Object as PropType<ReturnType<typeof usePagination>>,
    required: true
  }
})

defineEmits(['load-next', 'load-prev'])
</script>

<style lang="scss">
.rst-pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-start: 16px;

  * + * {
    margin-inline-start: 8px;
  }
}
</style>
