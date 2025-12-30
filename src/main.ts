import './assets/main.css'
// import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import { primeTheme } from './theme/theme'
import { ToastService } from 'primevue'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: primeTheme,
  },
})
app.use(createPinia()).use(ToastService).use(VueQueryPlugin).use(router).mount('#app')
