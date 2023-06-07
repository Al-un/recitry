<template>
  <div class="login-page">
    <form class="rst-form rst-card padded" @submit.prevent="submitSignUp">
      <div class="rst-form__input-group">
        <rst-input
          v-model="signUpForm.email"
          type="email"
          label="Email"
          autocomplete="email"
          required
        />
      </div>
      <div class="rst-form__input-group">
        <rst-input
          v-model="signUpForm.username"
          type="text"
          label="Username"
        />
      </div>
      <div class="rst-form__input-group">
        <rst-input
          v-model="signUpForm.password"
          type="password"
          label="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="rst-form__input-group rst-button-group fluid">
        <button class="rst-button primary" type="submit">Signup!</button>
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

const app = useAppStore()

const signUpForm = reactive<AuthEndpointTypes['signup']['request']>({
  username: '',
  email: '',
  password: ''
})

async function submitSignUp() {
  await app.signUp(signUpForm)

  navigate('/login')
}
</script>

<style lang="scss">
.login-page {
  @include flex-center-all;
  width: 100%;
  height: 100%;
}
</style>
