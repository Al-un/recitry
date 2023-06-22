import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { AuthEndpointTypes } from '@al-un/ressaite-core/um/auth.endpoints'
import { callEndpoint } from '@/api'
import type { SessionInfo } from '@al-un/ressaite-core/um/users.models'

export const useAppStore = defineStore('app', () => {
  // ---------- State ---------------------------------------------------------
  let savedToken: string | null = null
  const sessionInfo = ref<SessionInfo | null>(null)
  if (typeof window !== 'undefined' && window.localStorage) {
    savedToken = window.localStorage.getItem('token')
  }
  const token = ref<string | null>(savedToken)

  // ---------- Computed ------------------------------------------------------
  const isAuthenticated = computed(() => {
    return token.value !== null
  })

  // ---------- Actions -------------------------------------------------------
  async function login(loginReq: AuthEndpointTypes['login']['request'], rememberMe: boolean) {
    const resp = await callEndpoint('login', null, loginReq)

    if (resp.status === 200) {
      token.value = resp.data.token

      if (rememberMe) {
        // find a better way T_T
        localStorage.setItem('token', token.value)
      }

      await loadSessionInfo()
    }
  }

  async function loadSessionInfo() {
    if (token.value === null) return

    const resp = await callEndpoint('sessionInfo')
    if (resp.status === 200) {
      sessionInfo.value = resp.data
    }
  }

  async function signUp(signUpReq: AuthEndpointTypes['signup']['request']) {
    const resp = await callEndpoint('signup', null, signUpReq)
    // console.log('signup status', resp.status)
    // console.log('signup resp', resp.data)
    // token.value = data.token
  }

  async function logout() {
    const resp = await callEndpoint('logout', null, null)

    if (resp.status === 204) {
      localStorage.removeItem('token')
      token.value = null
      sessionInfo.value = null
    }
  }

  // --------------------------------------------------------------------------
  return {
    isAuthenticated,
    loadSessionInfo,
    login,
    logout,
    sessionInfo,
    signUp,
    token
  }
})
