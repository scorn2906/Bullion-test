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

const handleSubmit = async (val: ReqRegisterDTO) => {
  console.log('val: ', val)
}
</script>

<style scoped></style>
