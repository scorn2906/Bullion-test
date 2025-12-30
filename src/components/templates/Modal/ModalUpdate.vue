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
        <h2 class="text-2xl font-bold">Edit User</h2>
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
    <Form
      v-if="!isLoading && data"
      v-slot="$form"
      class="flex flex-col gap-y-5 text-sm"
      :resolver
      :initialValues
      @submit="handleSubmit"
    >
      <div class="grid grid-cols-2 gap-x-4">
        <div class="flex flex-col gap-4">
          <label for="" class="font-bold">Nama Depan</label>
          <div class="flex flex-col gap-1">
            <InputText name="first_name" type="text" placeholder="Masukan nama" />
            <Message
              v-if="$form.first_name?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.first_name.error?.message }}</Message
            >
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <label for="" class="font-bold">Nama Belakang</label>
          <div class="flex flex-col gap-1">
            <InputText name="last_name" type="text" placeholder="Masukan nama" />
            <Message
              v-if="$form?.last_name?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.last_name.error?.message }}</Message
            >
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-4">
        <div class="flex flex-col gap-4">
          <label for="" class="font-bold">Jenis Kelamin</label>
          <div class="flex flex-col gap-1">
            <Select
              name="gender"
              :options="listGender"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a City"
              fluid
            />
            <Message v-if="$form.gender?.invalid" severity="error" size="small" variant="simple">{{
              $form.gender.error?.message
            }}</Message>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <label for="" class="font-bold">Tanggal Lahir</label>
          <div class="flex flex-col gap-1">
            <DatePicker
              name="date_of_birth"
              showIcon
              fluid
              iconDisplay="input"
              :defaultValue="new Date(initialValues.date_of_birth)"
            >
              <template #inputicon="slotProps">
                <img src="@/assets/icons/calendar-alt.svg" @click="slotProps.clickCallback" />
              </template>
            </DatePicker>
            <Message
              v-if="$form.date_of_birth?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.date_of_birth.error?.message }}</Message
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <label for="" class="font-bold">Email</label>
        <div class="flex flex-col gap-1">
          <InputText name="email" type="text" placeholder="Masukan email" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
            $form.email.error?.message
          }}</Message>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <label for="" class="font-bold">No. Handphone</label>
        <div class="flex flex-col gap-1">
          <InputText name="phone" type="text" placeholder="Masukan no handphone" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
            $form.email.error?.message
          }}</Message>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <label for="" class="font-bold">Alamat</label>
        <div class="flex flex-col gap-1">
          <InputText name="address" type="text" placeholder="Masukan alamat" />
          <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{
            $form.address.error?.message
          }}</Message>
        </div>
      </div>
      <pre>{{ loading }}</pre>
      <Button
        type="submit"
        label="Edit"
        severity="primary"
        :loading="loading"
        :disabled="loading || !$form.valid"
      />
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { Button, DatePicker, Dialog, InputText, Message, Select } from 'primevue'
import z from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { ref, watch } from 'vue'
import type { ReqUpdateUserDTO } from '@/features/user/user.types'
import { useDetailUserQuery } from '@/features/user/useDetailUserQuery'

const schema = z.object({
  email: z.email('Invalid email').min(1, 'Email is required'),
  date_of_birth: z.date(),
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string(),
  gender: z.string(),
  phone: z.string(),
  address: z.string(),
})
const resolver = ref(zodResolver(schema))

const props = defineProps<{
  id: string
  visible: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', values: ReqUpdateUserDTO): void
}>()

const initialValues = ref<ReqUpdateUserDTO>({
  first_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  email: '',
  phone: '',
  address: '',
})

const { data, isLoading } = useDetailUserQuery(props.id)

watch(
  () => data?.value?.data,
  (user) => {
    if (user) {
      initialValues.value = {
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        gender: user.gender ?? '',
        date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : new Date(),
        email: user.email ?? '',
        phone: user.phone ?? '',
        address: user.address ?? '',
      }
    }
  },
  { immediate: true },
)

const listGender = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const handleClose = () => {
  emit('close')
}

const handleSubmit = (event: FormSubmitEvent) => {
  if (event.valid) emit('submit', event.values as ReqUpdateUserDTO)
}
</script>
