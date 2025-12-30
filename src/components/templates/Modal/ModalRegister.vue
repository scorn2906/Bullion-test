<template>
  <Dialog
    :visible="$props.visible"
    modal
    :draggable="false"
    :closeOnEscape="false"
    :dismissableMask="false"
    class="w-md p-3"
    @hide="handleClose"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Tambah User</h2>
      </div>
    </template>
    <template #closeicon>
      <div
        class="w-6.5 h-6.5 rounded-full bg-(--primary) text-white flex items-center justify-center"
        @click="handleClose"
      >
        <i class="pi pi-times" style="font-size: 10px"></i>
      </div>
    </template>
    <RegisterForm @submit="handleSubmit" />
  </Dialog>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/organisms/form/RegisterForm.vue'
import type { ReqRegisterDTO } from '@/features/user/user.types'
import { Dialog } from 'primevue'

defineProps<{
  visible: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', values: ReqRegisterDTO): void
}>()

const handleClose = () => {
  emit('close')
}

const handleSubmit = (val: ReqRegisterDTO) => {
  emit('submit', val)
}
</script>
