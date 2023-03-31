<template>
  <div class="layout-page">
    <nav class="layout-navigation">
      <a href="/">Home</a>
    </nav>

    <main class="layout-content"><slot></slot></main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

onMounted(() => {
  console.log('Layout LOADED!!')
})

const nav = () => {
  navigate('/pouet')
}
</script>

<style lang="scss">
$nav-header-height: 40px;

.layout-page {
  width: 100vw;
  height: 100vh;
}

.layout-navigation {
  height: $nav-header-height;
  border-bottom: 1px solid black;
}

.layout-content {
  height: calc(100% - $nav-header-height);
}
</style>

<style lang="scss" scoped>
.layout {
  display: flex;
  max-width: 900px;
  margin: auto;
}
.content {
  padding: 20px;
  border-left: 2px solid #eee;
  padding-bottom: 50px;
  min-height: 100vh;
}
.navigation {
  background-color: $plop;
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8em;
}
.logo {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
