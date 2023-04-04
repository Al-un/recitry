import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { LoginReq } from '@al-un/ressaite-core/um/models/Auth'

export const useAppStore = defineStore('app', () => {
  // ---------- State ---------------------------------------------------------
  const userInfo = ref<number | null>(null)

  // ---------- Computed ------------------------------------------------------
  const isAuthenticated = computed(() => userInfo.value !== null)

  // ---------- Actions -------------------------------------------------------
  async function login(loginReq: LoginReq) {
    console.log('Logging', loginReq)

    const resp = await window.fetch('http://localhost:8000/v1/login/', {
      body: JSON.stringify(loginReq),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
    console.log('login status', resp.status)
    const data = await resp.json()
    console.log('login resp', data)
    userInfo.value = 1
  }

  async function logout() {
    userInfo.value = null
  }

  // --------------------------------------------------------------------------
  return {
    isAuthenticated,
    login,
    logout,
    userInfo
  }
})
