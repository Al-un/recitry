<template>
  <div class="login-page">
    <form class="rst-form rst-card padded" @submit.prevent="submitLogin">
      <div class="rst-form__input-group">
        <rst-input
          v-model="state.loginForm.email"
          type="email"
          label="Email"
          autocomplete="email"
          required
        />
      </div>
      <div class="rst-form__input-group">
        <rst-input
          v-model="state.loginForm.password"
          type="password"
          label="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <label class="rst-form__input-group">
        <input v-model="state.loginForm.rememberMe" type="checkbox" />
        Remember me
      </label>

      <div class="rst-form__input-group rst-button-group fluid">
        <button class="rst-button primary" type="submit">Login!</button>
      </div>

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

const appStore = useAppStore()

interface State {
  loginForm: AuthEndpointTypes['login']['request'] & { rememberMe: boolean }
  signupForm: AuthEndpointTypes['signup']['request']
}

const redirectUrl: string | null = null

const state = reactive<State>({
  loginForm: { email: '', password: '', rememberMe: false },
  signupForm: { email: '', password: '' }
})

async function submitLogin() {
  await appStore.login(state.loginForm, state.loginForm.rememberMe)

  if (appStore.isAuthenticated) {
    const toRedirect = redirectUrl || '/'
    navigate(toRedirect)
  }
}
</script>

<style lang="scss">
.login-page {
  @include flex-center-all;
  width: 100%;
  height: 100%;
}
// .login-card {
//   @include flex-col;
// }
</style>
