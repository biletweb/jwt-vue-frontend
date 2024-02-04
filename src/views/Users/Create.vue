<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center">
    <router-link :to="{ name: 'users.index' }">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
    </router-link>
    <span class="text-2xl">Create user</span>
  </div>
  <div class="mt-5 flex justify-center">
    <div class="w-6/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <div v-if="error" class="my-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700">{{ error }}</div>
        <input v-model="name" type="text" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Name" />
        <input v-model="email" type="text" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Email" />
        <input v-model="password" type="password" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Password" />
        <input v-model="password_confirmation" type="password" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Password confirmation" />
        <div v-if="loader" class="mt-5 flex justify-center">
          <AppLoader />
        </div>
        <button v-else @click="createUser" class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600">Create user</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/axios/api'
import { useRouter } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref('')
const loader = ref('')

async function createUser() {
  try {
    loader.value = true
    await api.post(`/users/create`, {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    router.push({ name: 'users.index' })
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
      default:
        error.value = 'Something went wrong'
        break
    }
  } finally {
    loader.value = false
  }
}
</script>
