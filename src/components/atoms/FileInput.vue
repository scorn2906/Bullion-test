<template>
  <div class="flex flex-col gap-1">
    <IconField @click="triggerFileInput">
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        accept=".jpeg,.jpg,image/jpeg,image/jpg"
        @change="handleFileChange"
      />
      <div class="w-full cursor-pointer p-inputtext p-component pl-3!">
        <span>{{ fileName || 'Pilih foto profil' }}</span>
        <InputIcon
          class="pi pi-cloud-upload"
          :style="{ color: 'var(--primary)', fontSize: '20px' }"
        />
      </div>
    </IconField>
    <Message v-if="error" severity="error" size="small" variant="simple">{{ error }}</Message>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconField, InputIcon } from 'primevue'

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<string | null>(null)
const error = ref<string | null>(null)
const MAX_SIZE = 5 * 1024 * 1024

const emit = defineEmits<{
  (e: 'update:file', base64: string): void
}>()

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  error.value = null

  if (!target.files || target.files.length === 0) {
    fileName.value = null
    emit('update:file', '')
    return
  }

  const file = target.files[0]
  if (file) {
    if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
      error.value = 'Only JPEG/JPG images are allowed.'
      fileName.value = null
      emit('update:file', '')
      return
    }

    if (file.size > MAX_SIZE) {
      error.value = 'File must be less than 5MB.'
      fileName.value = null
      emit('update:file', '')
      return
    }

    fileName.value = file.name

    const reader = new FileReader()
    reader.onload = () => {
      emit('update:file', reader.result as string)
    }
    reader.onerror = () => {
      error.value = 'Failed to read file.'
      emit('update:file', '')
    }
    reader.readAsDataURL(file)
  }
}
</script>
