import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'accessToken'
export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem(TOKEN_KEY))

  const isAuthenticated = computed(() => !!accessToken.value)

  function setAuthToken(token: string) {
    accessToken.value = token
    localStorage.setItem(TOKEN_KEY, token)
  }

  function clearToken() {
    accessToken.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return { accessToken, isAuthenticated, setAuthToken, clearToken }
})
