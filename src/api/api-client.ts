import type { AxiosInstance, AxiosPromise } from 'axios'
import { AxiosManager } from './http'

export interface IApiClientContext {
  http: AxiosInstance
  httpWithAuth: AxiosInstance
  api: <T>(axiosPromise: AxiosPromise<T>) => Promise<T>
}

export const axiosManager = new AxiosManager()
