<template>
  <div class="central-aligned-page">
    <h2>{{ $t('dashboard.quick_menu.title') }}</h2>
    <div class="dashboard-quick-cards-container">
      <a class="rst-card padded" href="/materials">{{ $t('dashboard.quick_menu.materials') }}</a>
    </div>

    <h2>Inventories</h2>
    <invent-list />
  </div>
</template>

<script lang="ts" setup>
import InventList from '@/components/inventories/InventList.vue'
</script>

<style lang="scss">
.dashboard-quick-cards-container {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
