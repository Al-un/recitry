<template>
  <div class="login-page">
    <form class="rst-form rst-card padded login-form" @submit.prevent="submitLogin">
      <h2>Login</h2>

      <section class="rst-form__input-group">
        <rst-input
          v-model="state.loginForm.email"
          type="email"
          label="Email"
          autocomplete="email"
          required
        />
      </section>
      <section class="rst-form__input-group">
        <rst-input
          v-model="state.loginForm.password"
          type="password"
          label="Password"
          autocomplete="current-password"
          required
        />
      </section>

      <label class="rst-form__input-group">
        <input v-model="state.loginForm.rememberMe" type="checkbox" />
        Remember me
      </label>

      <section class="rst-form__input-group rst-button-group fluid">
        <button class="rst-button primary" type="submit">Login!</button>
      </section>

      <footer>
        <p>No account? Sign up <a href="/signup" class="rst-link">there</a></p>
      </footer>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { AuthEndpointTypes } from '@al-un/recitry-core/um/auth.endpoints'

import RstInput from '@/core/components/ui/form/RstInput.vue'
import { useAuthStore } from '@/um/stores/auth'

const authStore = useAuthStore()

interface State {
  loginForm: AuthEndpointTypes['login']['request'] & { rememberMe: boolean }
}

const redirectUrl: string | null = null

const state = reactive<State>({
  loginForm: { email: '', password: '', rememberMe: true },
})

async function submitLogin() {
  await authStore.login(state.loginForm, state.loginForm.rememberMe)

  if (authStore.isAuthenticated) {
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
  padding: 16px;

  @include media('<tablet') {
    align-items: flex-start;
  }
}

.login-form {
  width: 100%;
  max-width: 320px;
}
</style>
