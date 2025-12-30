<template>
  <Toast />
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import AuthLayout from './components/layouts/AuthLayout.vue'
import MainLayout from './components/layouts/MainLayout.vue'
import { computed } from 'vue'
import { Toast } from 'primevue'

const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout === 'auth') return AuthLayout
  return MainLayout
})
</script>

<style scoped></style>
