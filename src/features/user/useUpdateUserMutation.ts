import { useMutation } from '@tanstack/vue-query'
import type { DetailUser, ReqUpdateUserDTO } from './user.types'
import { useApiClient } from '@/composables/userApiClient'
import type { ResponseAPI } from '@/api/types'

interface Props {
  payload: ReqUpdateUserDTO
  id: string
}
export const useUpdateUserMutation = () => {
  const { httpWithAuth, api } = useApiClient()
  return useMutation({
    mutationFn: async ({ payload, id }: Props) => {
      return await api<ResponseAPI<DetailUser>>(
        httpWithAuth.put(`/api/v1/admin/${id}/update`, payload),
      )
    },
  })
}
