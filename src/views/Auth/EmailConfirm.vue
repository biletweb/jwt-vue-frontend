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

    <span class="text-2xl">Email confirmation</span>
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

        <div v-if="loader" class="flex justify-center">
          <AppLoader />
        </div>

        <button
          v-else
          :disabled="successResponse !== ''"
          @click="confirmEmail(token, user)"
          class="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Complete registration
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import api from '@/axios/api'
import AppLoader from '@/components/AppLoader.vue'

const route = useRoute()
const token = route.params.token
const user = route.params.user
const successResponse = ref('')
const errorResponse = ref('')
const loader = ref(false)

async function confirmEmail($token, $user) {
  try {
    loader.value = true
    successResponse.value = ''
    errorResponse.value = ''
    const response = await api.post(`/auth/email/confirm`, {
      token: $token,
      user: $user
    })
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
