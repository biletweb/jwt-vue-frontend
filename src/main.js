import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Базовый URL для изображений с бекэнда как глобальное свойство приложения
app.config.globalProperties.$imageUrl = 'http://127.0.0.1:8000/storage/'

app.use(createPinia())
app.use(router)

app.mount('#app')
