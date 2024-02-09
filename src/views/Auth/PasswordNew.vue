<template>
  <div class="flex items-center">
    <router-link :to="{ name: 'signin' }">
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

    <span class="text-2xl">Password reset</span>
  </div>

  <div class="mt-5 flex justify-center">
    <div class="w-4/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <div
          v-if="successResponse"
          class="mb-5 rounded-r-lg border-l-4 border-green-500 bg-green-100 p-5 text-green-700"
        >
          {{ successResponse }}
        </div>
        <div
          v-if="errorResponse"
          class="mb-5 rounded-r-lg border-l-4 border-red-500 bg-red-100 p-5 text-red-700"
        >
          {{ errorResponse }}
        </div>
        <div
          v-if="warningResponse"
          class="mb-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700"
        >
          {{ warningResponse }}
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
              type="password"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              :class="{
                'border-red-500': [
                  'The password field is required',
                  'The password confirmation field is required',
                  'The password field must be at least 6 characters'
                ].includes(warningResponse)
              }"
              placeholder="New password"
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
              type="password"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              :class="{
                'border-red-500': [
                  'The password field confirmation does not match'
                ].includes(warningResponse)
              }"
              placeholder="Password confirmation"
            />
          </div>
        </div>

        <div v-if="loader" class="mt-5 flex justify-center">
          <AppLoader />
        </div>

        <button
          v-else
          @click="passwordNew()"
          class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Password reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/axios/api'
import { ref } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const token = route.params.token
const user = route.params.user
const password = ref('')
const password_confirmation = ref('')
const successResponse = ref('')
const warningResponse = ref('')
const errorResponse = ref('')
const loader = ref(false)

async function passwordNew() {
  try {
    loader.value = true
    successResponse.value = ''
    warningResponse.value = ''
    errorResponse.value = ''
    const response = await api.post(`/auth/password/new`, {
      token: token,
      user: user,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    password.value = ''
    password_confirmation.value = ''
    successResponse.value = response.data.message
  } catch (error) {
    switch (error.response.data.error.message) {
      case 'Invalid token':
        console.log('Invalid token')
        errorResponse.value = 'Invalid token'
        break
      case 'User not found':
        console.log('User not found')
        errorResponse.value = 'User not found'
        break
      case 'The password field is required.':
        console.log('The password field is required')
        warningResponse.value = 'The password field is required'
        break
      case 'The password field confirmation does not match.':
        console.log('The password field confirmation does not match.')
        warningResponse.value = 'The password field confirmation does not match'
        break
      case 'The password field must be at least 6 characters.':
        console.log('The password field must be at least 6 characters.')
        warningResponse.value =
          'The password field must be at least 6 characters'
        break
      default:
        console.log('Something went wrong')
        errorResponse.value = 'Something went wrong'
        break
    }
  } finally {
    loader.value = false
  }
}
</script>
