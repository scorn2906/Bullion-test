<template>
  <Form
    v-slot="$form"
    class="mt-8 flex flex-col gap-y-6"
    :resolver
    :initialValues
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-4">
      <label for="" class="font-bold">Email</label>
      <div class="flex flex-col gap-1">
        <InputText name="email" type="email" placeholder="Masukan email" />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error?.message
        }}</Message>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <label for="" class="font-bold">Password</label>
      <div class="flex flex-col gap-1">
        <InputText name="password" type="password" placeholder="Masukan password" />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message
        }}</Message>
      </div>
    </div>
    <Button
      type="submit"
      label="Masuk"
      :disabled="props.isLoading || !$form.valid"
      :loading="props.isLoading"
    />
  </Form>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, InputText, Message } from 'primevue'
import { ref } from 'vue'
import z from 'zod'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

const props = defineProps<{
  isLoading: boolean
}>()

const resolver = ref(zodResolver(schema))
const emit = defineEmits<{
  (e: 'submit', values: FormValues): void
}>()

const initialValues = ref({
  email: '',
  password: '',
})

const onSubmit = (event: FormSubmitEvent) => {
  if (event.valid) {
    emit('submit', event.values as FormValues)
  }
}
</script>
