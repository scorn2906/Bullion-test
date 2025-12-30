<template>
  <Dialog
    :visible="visible"
    modal
    :draggable="false"
    :closeOnEscape="false"
    :dismissableMask="false"
    class="w-md p-3"
    @hide="handleClose"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Lihat User</h2>
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
    <div v-if="isLoading" class="flex flex-col gap-y-5 text-sm">
      <!-- Photo Skeleton -->
      <div class="flex flex-col items-center gap-y-4">
        <Skeleton shape="circle" size="7rem" />
      </div>

      <!-- Name -->
      <div class="grid grid-cols-2 gap-4">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </div>

      <!-- Gender & DOB -->
      <div class="grid grid-cols-2 gap-4">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </div>

      <!-- Email, Phone, Address -->
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
      <Skeleton height="2rem" />
    </div>
    <div v-else-if="user" class="flex flex-col gap-y-5 text-sm">
      <div class="flex flex-col items-center justify-center gap-y-4">
        <p class="font-bold">Foto Profil</p>
        <img class="w-28 h-28 rounded-full" :src="imgUrl" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-y-4">
          <h4 class="font-bold">Nama Depan</h4>
          <p>{{ user.first_name }}</p>
        </div>
        <div class="flex flex-col gap-y-4">
          <h4 class="font-bold">Nama Belakang</h4>
          <p>{{ user.last_name }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-y-4">
          <h4 class="font-bold">Jenis Kelamin</h4>
          <p>{{ user.gender }}</p>
        </div>
        <div class="flex flex-col gap-y-4">
          <h4 class="font-bold">Tanggal Lahir</h4>
          <p>{{ dayjs(user.date_of_birth).format('DD MMMM YYYY') }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-y-4">
        <h4 class="font-bold">Email</h4>
        <p>{{ user.email }}</p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h4 class="font-bold">No. Handphone</h4>
        <p>{{ user.phone }}</p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h4 class="font-bold">Alamat</h4>
        <p>{{ user.address }}</p>
      </div>
    </div>

    <div class="mt-8">
      <Button
        class="w-full"
        type="button"
        label="Edit"
        @click="handleClose"
        :disabled="isLoading"
      ></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useDetailUserQuery } from '@/features/user/useDetailUserQuery'
import { Button, Dialog, Skeleton } from 'primevue'
import { imgUrlBase64 } from '@/libs/utils'
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  visible: boolean
  id: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { data, isLoading } = useDetailUserQuery(props.id)

const user = computed(() => data.value?.data ?? null)
const imgUrl = computed(() =>
  user.value?.photo ? imgUrlBase64(user.value?.photo) : '@/assets/images/dummy-usser.png',
)

const handleClose = () => {
  emit('close')
}
</script>
