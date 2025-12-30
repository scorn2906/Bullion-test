<template>
  <div class="auth-layout flex bg-[#F1F3FC] gap-x-5">
    <sidebar-menu />
    <div class="py-6 pr-6 w-full h-screen overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '../templates/SidebarMenu.vue'
</script>
