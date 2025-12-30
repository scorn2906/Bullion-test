import { useApiClient } from '@/composables/userApiClient'
import type { ReqLoginDTO, ResLoginDTO } from './login.types'
import { useMutation } from '@tanstack/vue-query'
import type { ResponseAPI } from '@/api/types'

export const useLoginMutation = () => {
  const { http, api } = useApiClient()
  return useMutation({
    mutationFn: async (req: ReqLoginDTO) => {
      return await api<ResponseAPI<ResLoginDTO>>(http.post('/api/v1/auth/login', req))
    },
  })
}
