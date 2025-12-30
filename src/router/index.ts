import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'
import HomePage from '../views/home-page.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { public: false },
  },
  {
    path: '/login',
    name: 'login',
    meta: { public: true, layout: 'auth' },
    component: () => import('@/views/auth/login-page.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { public: true, layout: 'auth' },
    component: () => import('@/views/auth/register-page.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (!to.meta.public && !authStore.isAuthenticated) return { name: 'login' }

  if (to.meta.public && authStore.isAuthenticated) return { name: 'home' }
})

export default router
