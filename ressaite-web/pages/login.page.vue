<template>
  <div class="login-page">
    <form class="login-card rst-card" @submit.prevent="submitLogin">
      <rst-input v-model="form.username" />
      <rst-input v-model="form.password" type="password" />

      <button class="rst-button" type="submit">Login!</button>

      <div>
        <p>No account? Sign up <a href="/signup">there</a></p>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { AuthEndpointTypes } from '@al-un/ressaite-core/um/auth.endpoints'

import RstInput from '@/components/ui/form/RstInput.vue'
import { useAppStore } from '@/stores/app'
import { callEndpoint } from '@/api'

const app = useAppStore()

const form: AuthEndpointTypes['login']['request'] = reactive({
  username: '',
  password: ''
})

async function submitLogin() {
  const resp = await callEndpoint('login', null, {
    username: form.username,
    password: form.password
  })

  if (resp.status === 200) {
    app.$patch({
      token: resp.data.token
    })
    navigate('/')
  }
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
