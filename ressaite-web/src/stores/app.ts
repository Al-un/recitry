import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { AuthEndpointTypes } from '@al-un/ressaite-core/um/api/Auth'

export const useAppStore = defineStore('app', () => {
  // ---------- State ---------------------------------------------------------
  const userInfo = ref<number | null>(null)
  const token = ref<string | null>(null)

  // ---------- Computed ------------------------------------------------------
  const isAuthenticated = computed(() => token.value !== null)

  // ---------- Actions -------------------------------------------------------
  async function login(loginReq: AuthEndpointTypes['login']['request']) {
    console.log('Logging', loginReq)

    const resp = await window.fetch('http://localhost:8000/v1/login/', {
      body: JSON.stringify(loginReq),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log('login status', resp.status)
    const data = await resp.json()
    console.log('login resp', data)
    userInfo.value = 1
    token.value = data.token
  }
  async function signUp(loginReq: AuthEndpointTypes['signup']['request']) {
    console.log('Logging', loginReq)

    const resp = await window.fetch('http://localhost:8000/v1/signup/', {
      body: JSON.stringify(loginReq),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log('login status', resp.status)
    const data = await resp.json()
    console.log('login resp', data)
    userInfo.value = 1
    token.value = data.token
  }

  async function logout() {
    const resp = await window.fetch('http://localhost:8000/v1/logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token.value}`
      }
    })
    console.log('logout status', resp.status)
    const data = await resp.json()
    console.log('logout resp', data)
    userInfo.value = null
  }

  // --------------------------------------------------------------------------
  return {
    isAuthenticated,
    login,
    logout,
    signUp,
    userInfo
  }
})
