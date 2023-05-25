<template>
  <div class="central-aligned-page">
    <h2>{{ $t('dashboard.quick_menu.title') }}</h2>
    <div class="dashboard-quick-cards-container">
      <a class="rst-card padded" href="/inventories">{{ $t('dashboard.quick_menu.inventories') }}</a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.dashboard-quick-cards-container {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
