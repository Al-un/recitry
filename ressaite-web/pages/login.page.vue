<template>
  <div class="login-page">
    <div class="login-card rst-card">
      <rst-input v-model="form.username" />
      <rst-input v-model="form.password" type="password" />

      <button class="rst-button" @click="submitLogin">Login!</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { LoginReq } from '@al-un/ressaite-core/um/models/Auth'

import RstInput from '@/components/ui/form/RstInput.vue'
import { useAppStore } from '@/stores/app'

const app = useAppStore()

const form: LoginReq = reactive({
  username: '',
  password: ''
})

const submitLogin = async () => {
  await app.login({
    username: form.username,
    password: form.password
  })

  navigate('/')
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
