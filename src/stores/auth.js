import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import api from '@/axios/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const userInfo = ref({
    access_token: '',
    expires_in: '',
    token_type: ''
  })
  const error = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const authUrl = ref('')
    error.value = ''
    loader.value = true

    if (type === 'signup') {
      authUrl.value = 'register'
    } else if (type === 'signin') {
      authUrl.value = 'login'
    }

    try {
      const response = await api.post(`/auth/${authUrl.value}`, {
        ...payload
      })
      if (type === 'signup') {
        alert('To complete registration you need to confirm your email')
        router.push({ name: 'signin' })
      } else {
        userInfo.value = {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          token_type: response.data.token_type
        }
        localStorage.setItem('access_token', userInfo.value.access_token)
        if (payload.remember_me) {
          localStorage.setItem('remember_me', true)
        }
        router.push({ name: 'home' })
      }
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'The name field is required.':
          error.value = 'The name field is required'
          break
        case 'The name field must be between 2 and 100 characters.':
          error.value = 'The name field must be between 2 and 100 characters'
          break
        case 'The email field is required.':
          error.value = 'The email field is required'
          break
        case 'The email has already been taken.':
          error.value = 'The email has already been taken'
          break
        case 'The email field must be a valid email address.':
          error.value = 'The email field must be a valid email address'
          break
        case 'The password field is required.':
          error.value = 'The password field is required'
          break
        case 'The password field must be at least 6 characters.':
          error.value = 'The password field must be at least 6 characters'
          break
        case 'The password field confirmation does not match.':
          error.value = 'The password field confirmation does not match'
          break
        case 'Unauthorized':
          error.value = 'Invalid credentials'
          break
        case 'Too Many Requests':
          error.value = 'Too many requests'
          break
        case 'You have not confirmed email':
          error.value = 'You have not confirmed email'
          break
        case 'Failed to send confirmation email, try again later':
          error.value = 'Failed to send confirmation email, try again later'
          break
        default:
          error.value = 'Something went wrong'
          break
      }
      console.log(err.response.data.error.message)
    } finally {
      loader.value = false
    }
  }

  const logout = () => {
    localStorage.clear()
    userInfo.value = {}
    router.push({ name: 'home' })
  }

  return { userInfo, auth, logout, error, loader }
})
