<template>
  <div class="login-page">
    <div class="login-card rst-card">
      <rst-input v-model="form.username" />
      <rst-input v-model="form.password" type="password" />

      <button class="rst-button" @click="submitLogin">Login!</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import RstInput from '@/components/ui/form/RstInput.vue'

const form = reactive({
  username: 'username',
  password: 'password'
})

function submitLogin() {
  console.log('Login with', form)
}
</script>

<style lang="scss">
.login-page {
  @include flex-center-all;
  width: 100%;
  height: 100%;
}
.login-card {
  @include flex-col;
}
</style>
