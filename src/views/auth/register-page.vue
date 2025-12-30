<template>
  <div class="grid grid-cols-3 h-full">
    <AuthSide bgColor="blue" />
    <div class="col-span-2 flex flex-col items-center py-15">
      <div class="w-full max-w-md">
        <h1 class="font-bold text-3xl mb-8">Daftar</h1>
        <RegisterForm @submit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/organisms/form/RegisterForm.vue'
import AuthSide from '@/components/templates/AuthSide.vue'
import type { ReqRegisterDTO } from '@/features/user/user.types'
import { useCreateUserMutation } from '@/features/user/useRegisterMutation'
import axios from 'axios'
import { useToast } from 'primevue'

const registerMutation = useCreateUserMutation()
const toast = useToast()

const handleSubmit = async (val: ReqRegisterDTO) => {
  try {
    const res = await registerMutation.mutateAsync(val)
    if (res) {
      toast.add({
        severity: 'success',
        summary: 'Create user success',
        life: 300,
      })
    }
  } catch (error) {
    let errorMessage = 'Create user failed, please try again!'
    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data.err_message ?? error.response?.data?.message ?? errorMessage
    }
    toast.add({
      severity: 'error',
      summary: 'Create User failed',
      detail: errorMessage,
      life: 3000,
    })
  }
}
</script>

<style scoped></style>
