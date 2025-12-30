import { axiosManager } from '@/api/api-client'
import type { AxiosPromise } from 'axios'

export function useApiClient() {
  const api = async <T>(axiosPromise: AxiosPromise<T>): Promise<T> => {
    const { data } = await axiosPromise
    return data
  }

  return {
    http: axiosManager.http,
    httpWithAuth: axiosManager.httpWithAuth,
    api,
  }
}
