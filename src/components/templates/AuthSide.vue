<template>
  <div :class="[bgColor === 'blue' ? 'bg-[#2E74B2]' : 'bg-[#FD5725]', 'p-15 relative']">
    <div class="flex items-center justify-start">
      <img src="@/assets/images/logo/logo.png" />
    </div>
    <img src="@/assets/images/logo/logomark.png" class="absolute top-0 left-0" />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  bgColor?: 'blue' | 'orange'
}>()
</script>
