import type { ResponseAPI } from '@/api/types'
import { useApiClient } from '@/composables/userApiClient'
import { useQuery } from '@tanstack/vue-query'
import type { DetailUser } from './user.types'

export const useDetailUserQuery = (id: string) => {
  const { httpWithAuth, api } = useApiClient()
  return useQuery({
    queryKey: ['detailUser', id],
    queryFn: async () => api<ResponseAPI<DetailUser>>(httpWithAuth.get(`/api/v1/admin/${id}`)),
    enabled: !!id,
  })
}
