<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center">
    <div class="w-4/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <h1 class="mb-4 text-2xl font-bold text-green-500">Sign up</h1>
        <div
          v-if="authStore.error"
          class="mb-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700"
        >
          {{ authStore.error }}
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
                ].includes(authStore.error)
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
                ].includes(authStore.error)
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
                ].includes(authStore.error)
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
                ].includes(authStore.error)
              }"
              type="password"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Password confirmation"
            />
          </div>
        </div>
        <div v-if="authStore.loader" class="mt-5 flex justify-center">
          <AppLoader />
        </div>
        <button
          v-else
          @click="signIn"
          class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import AppLoader from '@/components/AppLoader.vue'

const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

async function signIn() {
  await authStore.auth(
    {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    },
    'signup'
  )
}
</script>
