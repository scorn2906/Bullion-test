import type { ResponseAPI } from '@/api/types'
import { useApiClient } from '@/composables/userApiClient'
import { useQuery } from '@tanstack/vue-query'
import type { ActiveUser } from './user.types'

interface Props {
  limit: number
  offset: number
}
export const useActiveUserQuery = ({ limit, offset }: Props) => {
  const { httpWithAuth, api } = useApiClient()
  return useQuery({
    queryKey: ['active-users'],
    queryFn: async () =>
      api<ResponseAPI<ActiveUser[]>>(
        httpWithAuth.get(`/api/v1/admin?limit=${limit}&offset=${offset}`),
      ),
  })
}
