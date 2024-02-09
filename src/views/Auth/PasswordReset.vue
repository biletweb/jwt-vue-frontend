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
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="email"
              type="text"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              :class="{
                'border-red-500': ['The email field is required'].includes(
                  warningResponse
                )
              }"
              placeholder="Email"
            />
          </div>
        </div>

        <div v-if="loader" class="mt-5 flex justify-center">
          <AppLoader />
        </div>

        <button
          v-else
          :disabled="successResponse !== ''"
          @click="sendResetLink()"
          class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Send password reset link
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/axios/api'
import { ref } from 'vue'
import AppLoader from '@/components/AppLoader.vue'

const email = ref('')
const successResponse = ref('')
const warningResponse = ref('')
const errorResponse = ref('')
const loader = ref(false)

async function sendResetLink() {
  try {
    loader.value = true
    successResponse.value = ''
    warningResponse.value = ''
    errorResponse.value = ''
    const response = await api.post(`/auth/password/reset`, {
      email: email.value
    })
    successResponse.value = response.data.message
    email.value = ''
  } catch (error) {
    switch (error.response.data.error.message) {
      case 'The email field is required.':
        console.log('The email field is required')
        warningResponse.value = 'The email field is required'
        break
      case 'The email field must be a valid email address.':
        console.log('The email must be a valid email address')
        warningResponse.value = 'The email must be a valid email address'
        break
      case 'Email not found':
        console.log('Email not found')
        errorResponse.value = 'Email not found'
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
