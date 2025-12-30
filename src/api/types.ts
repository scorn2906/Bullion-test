export interface ResponseAPI<T> {
  data: T
  iserror: boolean
  message: string
  status: number
}

export interface ApiErrorResponse {
  err_message: string
  error_code?: string
  errors?: Record<string, string[]> // optional field errors
}
