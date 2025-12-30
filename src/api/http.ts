// import axios from 'axios'

import { env } from '@/config/env'
import { useAuthStore } from '@/stores'
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

export class AxiosManager {
  public readonly http: AxiosInstance
  public readonly httpWithAuth: AxiosInstance

  constructor() {
    const baseConfig = { baseURL: env.baseUrl }
    this.http = axios.create(baseConfig)
    this.httpWithAuth = axios.create(baseConfig)

    this.httpWithAuth.interceptors.request.use(this.authRequestInterceptor)

    this.httpWithAuth.interceptors.response.use(
      this.fulfilledResponseInterceptor,
      this.unauthorizedResponseInterceptor,
    )
  }

  private async authRequestInterceptor(config: InternalAxiosRequestConfig) {
    const authStore = useAuthStore()

    if (authStore.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
      config.headers.Accept = 'application/json'
    }
    return config
  }

  private async fulfilledResponseInterceptor(response: AxiosResponse) {
    return response
  }

  private async unauthorizedResponseInterceptor(error: AxiosError) {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.clearToken()

      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
}
