<template>
  <nav class="w-full max-w-3xs py-5 bg-white">
    <div class="px-4 py-5 flex items-center justify-between">
      <img src="@/assets/images/logo/logo-bei.png" />

      <i class="pi pi-bars text-black" />
    </div>
    <RouterLink
      v-for="menu in listMenu"
      :key="menu.path"
      :to="menu.path"
      class="px-6 py-3 flex items-center gap-x-2.5 text-gray-500"
      active-class="bg-(--primary) text-white font-semibold"
    >
      <div class="w-5 h-5 rounded-md bg-[#7E1810]"></div>
      {{ menu.name }}
    </RouterLink>
  </nav>
</template>
<script setup lang="ts">
const listMenu = [
  {
    path: '/',
    name: 'User Aktif',
  },
  {
    path: '/menu-2',
    name: 'Menu 2',
  },
  {
    path: '/menu-3',
    name: 'Menu 3',
  },
  {
    path: '/menu-4',
    name: 'Menu 4',
  },
  {
    path: '/menu-5',
    name: 'Menu 5',
  },
]
</script>
