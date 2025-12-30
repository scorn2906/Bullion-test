<template>
  <Form
    v-slot="$form"
    class="flex flex-col gap-y-5 text-sm"
    :resolver
    :initialValues
    @submit="onFormSubmit"
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
          <DatePicker name="date_of_birth" showIcon fluid iconDisplay="input">
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
        <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
          $form.phone.error?.message
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
    <div class="grid grid-cols-2 gap-x-4">
      <div class="flex flex-col gap-4">
        <label for="" class="font-bold">Password</label>
        <div class="flex flex-col gap-1">
          <InputText name="password" type="password" placeholder="Masukan password" />
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
            $form.password.error?.message
          }}</Message>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <label for="" class="font-bold">Konfirmasi Password</label>
        <div class="flex flex-col gap-1">
          <InputText name="confirm_password" type="password" placeholder="Konfirmasi password" />
          <Message
            v-if="$form.confirm_password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.confirm_password.error?.message }}</Message
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <label for="" class="font-bold">Foto Profil</label>
      <div class="flex flex-col gap-1">
        <FormField v-slot="$field" name="photo" :initialValue="initialValues.photo">
          <FileInput
            name="photo"
            :file="$field.value"
            @update:file="
              (base64: string) => {
                $field.value = base64
              }
            "
          />
        </FormField>
      </div>
    </div>
    <Button type="submit" label="Tambah" severity="info" />
  </Form>
</template>

<script setup lang="ts">
import FileInput from '@/components/atoms/FileInput.vue'
import type { ReqRegisterDTO } from '@/features/user/user.types'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, DatePicker, InputText, Message, Select } from 'primevue'
import { ref } from 'vue'
import z from 'zod'

const passwordSchema = z
  .string({ message: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least 1 uppercase letter',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Password must contain at least 1 lowercase letter',
  })
  .refine((val) => /\d/.test(val), {
    message: 'Password must contain at least 1 number',
  })

const schema = z
  .object({
    email: z.email('Invalid email').min(1, 'Email is required'),
    password: passwordSchema,
    confirm_password: z
      .string({ message: 'Confirm password is required' })
      .min(1, 'Confirm password is required'),
    date_of_birth: z
      .date()
      .pipe(z.coerce.date())
      .refine((date) => date instanceof Date, {
        message: 'Date of birth is required',
      }),
    first_name: z.string().min(1, 'First Name is required'),
    gender: z.string().min(1, 'Gender is required'),
    last_name: z.string().min(1, 'Last name is required'),
    phone: z.string({ message: 'Phone is required' }).min(8, 'Phone number is to short'),
    address: z.string().min(5, 'Address is required'),
    photo: z.string().nullable(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Passwords do not match',
      })
    }
  })
const resolver = ref(zodResolver(schema))

defineProps<{
  defaultValue?: ReqRegisterDTO
}>()
const emit = defineEmits<{
  (e: 'submit', values: ReqRegisterDTO): void
}>()

const initialValues = ref<{
  first_name: string
  last_name: string
  gender: string
  date_of_birth: string
  email: string
  phone: string
  address: string
  photo: null | string
  password: string
  confirm_password: string
}>({
  first_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  email: '',
  phone: '',
  address: '',
  photo: null,
  password: '',
  confirm_password: '',
})

const listGender = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const onFormSubmit = (event: FormSubmitEvent) => {
  const payload = event.values
  delete payload.confirm_password
  if (event.valid) emit('submit', payload as ReqRegisterDTO)
}
</script>
