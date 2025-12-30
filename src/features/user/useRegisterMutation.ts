import { useApiClient } from '@/composables/userApiClient'
import { useMutation } from '@tanstack/vue-query'
import type { ReqRegisterDTO, ResRegisterDTO } from './user.types'
import type { ResponseAPI } from '@/api/types'

export const useCreateUserMutation = () => {
  const { httpWithAuth, api } = useApiClient()
  return useMutation({
    mutationFn: async (payload: ReqRegisterDTO) => {
      return await api<ResponseAPI<ResRegisterDTO>>(
        httpWithAuth.post('/api/v1/auth/register', payload),
      )
    },
  })
}

// {
//           first_name: 'Imam',
//           last_name: 'huhu',
//           gender: 'male',
//           date_of_birth: '1995-08-31T00:00:00.000Z',
//           email: 'rachmansyah@email.com',
//           phone: '081234567890',
//           address: 'Jl. Suka suka No. 15, Bogor',
//           photo: '@/C:/Users/And/Downloads/user-avatar.png',
//           password: '6b8b5b14be25345f0f29975a47447391571af2b266a8a2c76e5b07418b4f5c96',
//         }
// curl --location -g '{{base_url}}/api/v1/auth/register' \
// --form 'first_name="Imam"' \
// --form 'last_name="Rachmansyah"' \
// --form 'gender="male"' \
// --form 'date_of_birth="1995-08-31T00:00:00.000Z"' \
// --form 'email="rachmansyah@email.com"' \
// --form 'phone="081234567890"' \
// --form 'address="Jl. Suka suka No. 15, Bogor"' \
// --form 'photo=@"/C:/Users/And/Downloads/user-avatar.png"' \
// --form 'password="6b8b5b14be25345f0f29975a47447391571af2b266a8a2c76e5b07418b4f5c96"'
