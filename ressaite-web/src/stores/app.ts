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
    console.log('Logging with', loginReq)
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
