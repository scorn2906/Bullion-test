<template>
  <div class="grid grid-cols-3 h-full">
    <AuthSide bgColor="orange" />
    <div class="col-span-2 flex flex-col items-center py-15">
      <div class="w-full max-w-md">
        <h1 class="font-bold text-3xl">Login Admin</h1>
        <LoginForm @submit="handleSubmit" :isLoading />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/organisms/form/LoginForm.vue'
import AuthSide from '@/components/templates/AuthSide.vue'
import { useLoginMutation } from '@/features/auth/useLoginMutation'
import { sha256 } from '@/libs/hash'
import { useAuthStore } from '@/stores'
import axios from 'axios'
import { useToast } from 'primevue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { mutateAsync, isPending } = useLoginMutation()
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isLoading = computed(() => isPending.value)

const handleSubmit = async (e: { email: string; password: string }) => {
  try {
    const hashPassword = await sha256(e.password)
    const payload = { ...e, password: hashPassword }
    const res = await mutateAsync(payload)
    if (res) {
      authStore.setAuthToken(res.data.token)
      router.replace({ name: 'home' })
    }
  } catch (error) {
    let errorMessage = 'Login failed, please try again!'
    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data.err_message ?? error.response?.data?.message ?? errorMessage
    }
    toast.add({
      severity: 'error',
      summary: 'Failed login',
      detail: errorMessage,
      life: 3000,
    })
  }
}
</script>

<style scoped></style>
