<template>
  <ModalDetailProfile
    v-if="modalDetail && idUser"
    @close="handleCloseDetailProfile"
    :visible="modalDetail"
    :id="idUser"
  />
  <ModalRegister
    v-if="modalRegister"
    @close="handleCloseModalRegister"
    :visible="modalRegister"
    :id="idUser"
    @submit="handleSubmit"
  />
  <ModalUpdate
    v-if="modalUpdate && idUser"
    @close="handleCloseModalUpdate"
    :visible="modalUpdate"
    :id="idUser"
    :loading="isUpdating"
    @submit="handleUpdateUser"
  />
  <nav class="py-8 px-9 bg-white rounded-md flex items-center justify-between">
    <h1 class="font-bold text-4xl">User Aktif</h1>
    <Button class="text-sm" @click="showModalRegister()">Tambah User</Button>
  </nav>
  <main class="mt-4 p-3 bg-white">
    <DataTable :value="users" tableStyle="min-width: 50rem" stripedRows :loading="isFetching">
      <Column field="_id" header="Account ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="date_of_birth" header="Date">
        <template #body="{ data }">
          {{ dayjs(data.date_of_birth).format('DD/MM/YYYY') }}
        </template>
      </Column>
      <Column field="status">
        <template #header>
          <span class="flex-1 text-center font-bold">Status</span>
        </template>
        <template #body>
          <div
            class="w-full bg-(--soft-green) px-3 py-2 text-center text-green-500 rounded-full text-xs"
          >
            Registered
          </div>
        </template>
      </Column>
      <Column field="_id" alignHeader="center">
        <template #header>
          <span class="flex-1 text-center font-bold">Action</span>
        </template>
        <template #body="{ data }">
          <div class="flex items-center justify-center gap-x-6">
            <div
              class="flex items-center gap-x-2 text-sm text-(--primary) cursor-pointer"
              @click="showDetailProfile(data._id)"
            >
              <i class="pi pi-eye"></i>
              Lihat
            </div>
            <div
              class="flex items-center gap-x-2 text-sm text-(--primary) cursor-pointer"
              @click="showModalUpdate(data._id)"
            >
              <i class="pi pi-pen-to-square"></i>
              Edit
            </div>
          </div>
        </template>
      </Column>
      <!-- <template #footer>
        <p>Pagination</p>
      </template> -->
    </DataTable>
  </main>
</template>

<script setup lang="ts">
import { useActiveUserQuery } from '@/features/user/useActiveUserQuery'
import { Button, Column, DataTable, useToast } from 'primevue'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import ModalDetailProfile from '@/components/templates/Modal/ModalDetailProfile.vue'
import ModalRegister from '@/components/templates/Modal/ModalRegister.vue'
import type { ReqRegisterDTO, ReqUpdateUserDTO } from '@/features/user/user.types'
import { useCreateUserMutation } from '@/features/user/useRegisterMutation'
import { sha256 } from '@/libs/hash'
import axios from 'axios'
import ModalUpdate from '@/components/templates/Modal/ModalUpdate.vue'
import { useUpdateUserMutation } from '@/features/user/useUpdateUserMutation'
import { useQueryClient } from '@tanstack/vue-query'
// import { useRoute } from 'vue-router'
// const route = useRoute()

const modalDetail = ref(false)
const modalRegister = ref(false)
const modalUpdate = ref(false)
const idUser = ref<string | null>(null)

const filter = {
  limit: 20,
  offset: 5,
}

const { data, isFetching } = useActiveUserQuery(filter)
const { mutateAsync } = useCreateUserMutation()
const updateMutation = useUpdateUserMutation()

const toast = useToast()
const queryClient = useQueryClient()

const users = computed(() => data.value?.data ?? [])
const isUpdating = computed(() => updateMutation.isPending.value)

const showDetailProfile = (id: string) => {
  idUser.value = id
  modalDetail.value = true
}

const showModalRegister = (id?: string) => {
  idUser.value = id ?? null
  modalRegister.value = true
}

const showModalUpdate = (id: string) => {
  idUser.value = id ?? null
  modalUpdate.value = true
}

const handleCloseDetailProfile = () => {
  modalDetail.value = false
  idUser.value = null
}

const handleCloseModalRegister = () => {
  modalRegister.value = false
}

const handleCloseModalUpdate = () => {
  modalUpdate.value = false
  idUser.value = null
}

const handleUpdateUser = async (val: ReqUpdateUserDTO) => {
  try {
    if (idUser.value) {
      const res = await updateMutation.mutateAsync({ payload: val, id: idUser.value })
      if (res) {
        queryClient.invalidateQueries({
          queryKey: ['detailUser', idUser.value],
        })
        handleCloseModalUpdate()
        toast.add({
          severity: 'success',
          summary: 'Edit User success',
          detail: 'Edit user succesfully',
          life: 3000,
        })

        queryClient.invalidateQueries({
          queryKey: ['active-users'],
        })
      }
    }
  } catch (error) {
    let errorMessage = 'Edit user failed, please try again!'
    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data.err_message ?? error.response?.data?.message ?? errorMessage
    }
    toast.add({
      severity: 'error',
      summary: 'Edit User failed',
      detail: errorMessage,
      life: 3000,
    })
  }
}

const handleSubmit = async (val: ReqRegisterDTO) => {
  try {
    const hashPassword = await sha256(val.password)
    const res = await mutateAsync({ ...val, password: hashPassword })
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

<style scoped>
:deep() {
  .p-datatable .p-datatable-tbody > tr:nth-child(odd) {
    background-color: var(--soft-primary);
  }
  .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {
    background-color: white !important;
  }

  .p-datatable-column-title {
    font-weight: 700 !important;
  }
}
</style>
