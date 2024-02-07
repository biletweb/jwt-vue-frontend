import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Добавление токена к запросу
instance.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem('access_token')

  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return config
})

// Перехватчик после получения ответа
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (
        error.response.data.message === 'Unauthenticated.' &&
        error.response.status === 401 &&
        localStorage.getItem('remember_me') === 'true'
      ) {
        const jwtToken = localStorage.getItem('access_token')
        if (jwtToken) {
          const response = await instance.post('/auth/refresh')
          localStorage.setItem('access_token', response.data.access_token)
          error.config.headers['Authorization'] =
            `Bearer ${response.data.access_token}`
          console.log('Success refresh token')
          return await instance(error.config)
        }
      }
      if (
        error.response.status === 401 &&
        localStorage.getItem('access_token')
      ) {
        const authStore = useAuthStore()
        authStore.logout()
        console.log('Token expired')
      }
    } catch (err) {
      console.error('Error refreshing token')
    }

    return Promise.reject(error)
  }
)

export default instance
