<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center">
    <router-link :to="{ name: 'users.index' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-3 h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
    </router-link>
    <span class="text-2xl">Create user</span>
  </div>
  <div class="mt-5 flex justify-center">
    <div class="w-4/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <div
          v-if="error"
          class="my-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700"
        >
          {{ error }}
        </div>

        <div class="flex items-center">
          <div class="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute left-2.5 top-2 h-6 w-6 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input
              v-model="name"
              :class="{
                'border-red-500': [
                  'The name field is required',
                  'The name field must be between 2 and 100 characters'
                ].includes(error)
              }"
              type="text"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Name"
            />
          </div>
        </div>
        <div class="flex items-center">
          <div class="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute left-2.5 top-2 h-6 w-6 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="email"
              :class="{
                'border-red-500': [
                  'The email field is required',
                  'The email has already been taken',
                  'The email field must be a valid email address'
                ].includes(error)
              }"
              type="text"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="flex items-center">
          <div class="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute left-2.5 top-2 h-6 w-6 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <input
              v-model="password"
              :class="{
                'border-red-500': [
                  'The password field is required',
                  'The password field must be at least 6 characters',
                  'The password field confirmation does not match'
                ].includes(error)
              }"
              type="password"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="flex items-center">
          <div class="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute left-2.5 top-2 h-6 w-6 text-slate-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <input
              v-model="password_confirmation"
              :class="{
                'border-red-500': [
                  'The password field confirmation does not match'
                ].includes(error)
              }"
              type="password"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Password confirmation"
            />
          </div>
        </div>
        <div v-if="loader" class="mt-5 flex justify-center">
          <AppLoader />
        </div>
        <button
          v-else
          @click="createUser"
          class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Create user
        </button>
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
    console.log(err.response.data.error.message)
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
