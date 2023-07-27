<template>
  <div class="signup-page">
    <form class="rst-form rst-card padded signup-form " @submit.prevent="submitSignUp">
      <h2>Sign up</h2>

      <section class="rst-form__input-group">
        <rst-input
          v-model="signUpForm.email"
          type="email"
          label="Email"
          autocomplete="email"
          required
        />
      </section>
      <section class="rst-form__input-group">
        <rst-input
          v-model="signUpForm.username"
          type="text"
          label="Username"
          autocomplete="username"
        />
      </section>
      <section class="rst-form__input-group">
        <rst-input
          v-model="signUpForm.password"
          type="password"
          label="Password"
          autocomplete="new-password"
          required
        />
      </section>

      <section class="rst-form__input-group rst-button-group fluid">
        <button class="rst-button primary" type="submit">Signup!</button>
      </section>

      <footer>
        <p>Already got an account? Login <a href="/login" class="rst-link">there</a></p>
      </footer>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'

import type { AuthEndpointTypes } from '@al-un/ressaite-core/um/auth.endpoints'

import RstInput from '@/core/components/ui/form/RstInput.vue'
import { useAuthStore } from '@/um/stores/auth'

const authStore = useAuthStore()

const signUpForm = reactive<AuthEndpointTypes['signup']['request']>({
  username: '',
  email: '',
  password: ''
})

async function submitSignUp() {
  await authStore.signUp(signUpForm)

  navigate('/login')
}
</script>

<style lang="scss">
.signup-page {
  @include flex-center-all;
  width: 100%;
  height: 100%;
  padding: 16px;
  
  @include media('<tablet') {
    align-items: flex-start;
  }
}

.signup-form {
  width: 100%;
  max-width: 320px;
}
</style>
