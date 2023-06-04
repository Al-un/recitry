import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { AuthEndpointTypes } from '@al-un/ressaite-core/um/auth.endpoints'
import { callEndpoint } from '@/api'

export const useAppStore = defineStore('app', () => {
  // ---------- State ---------------------------------------------------------
  const userInfo = ref<number | null>(null)
  const token = ref<string | null>(null)

  // ---------- Computed ------------------------------------------------------
  const isAuthenticated = computed(() => token.value !== null)

  // ---------- Actions -------------------------------------------------------
  async function login(loginReq: AuthEndpointTypes['login']['request']) {
    // console.log('Logging', loginReq)

    const resp = await callEndpoint('login', null, loginReq)

    // console.log('login status', resp.status)
    // console.log('login resp', resp.data)
    userInfo.value = 1
    token.value = resp.data.token
  }

  async function signUp(signUpReq: AuthEndpointTypes['signup']['request']) {
    const resp = await callEndpoint('signup', null, signUpReq)
    // console.log('signup status', resp.status)
    // console.log('signup resp', resp.data)
    // userInfo.value = 1
    // token.value = data.token
  }

  async function logout() {
    const resp = await callEndpoint('logout', null, null)
    // console.log('logout status', resp.status)
    // console.log('logout resp', resp.data)
    userInfo.value = null
  }

  // --------------------------------------------------------------------------
  return {
    isAuthenticated,
    login,
    logout,
    signUp,
    userInfo,
    token
  }
})
