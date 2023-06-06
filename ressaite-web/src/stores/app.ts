import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { AuthEndpointTypes } from '@al-un/ressaite-core/um/auth.endpoints'
import { callEndpoint } from '@/api'

export const useAppStore = defineStore('app', () => {
  // ---------- State ---------------------------------------------------------
  let savedToken: string | null = null
  if(typeof window !== 'undefined' && window.localStorage){
     savedToken = window.localStorage.getItem("token") ? `${ window.localStorage.getItem("token")}` : null
  }
  const token = ref<string | null>(savedToken)

  // ---------- Computed ------------------------------------------------------
  const isAuthenticated = computed(() => token.value !== null)

  // ---------- Actions -------------------------------------------------------
  async function login(
    loginReq: AuthEndpointTypes['login']['request'],
    rememberMe: boolean,
  ) {
    const resp = await callEndpoint('login', null, loginReq)

    // console.log('login status', resp.status)
    // console.log('login resp', resp.data)
    if(resp.status === 200){
      token.value = resp.data.token

      if(rememberMe){
        // find a better way T_T
        localStorage.setItem('token', token.value)
      }
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
    
    if(resp.status === 204){
      token.value == null
    }
  }

  // --------------------------------------------------------------------------
  return {
    isAuthenticated,
    login,
    logout,
    signUp,
    token
  }
})
