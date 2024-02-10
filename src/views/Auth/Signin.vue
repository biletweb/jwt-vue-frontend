<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center">
    <div class="w-4/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <h1 class="mb-4 text-2xl font-bold text-green-500">Sign in</h1>

        <div
          v-if="authStore.successResponse"
          class="mb-5 rounded-r-lg border-l-4 border-green-500 bg-green-100 p-5 text-green-700"
        >
          {{ authStore.successResponse }}
        </div>
        <div
          v-if="authStore.errorResponse"
          class="mb-5 rounded-r-lg border-l-4 border-red-500 bg-red-100 p-5 text-red-700"
        >
          {{ authStore.errorResponse }}
        </div>
        <div
          v-if="authStore.warningResponse"
          class="mb-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700"
        >
          {{ authStore.warningResponse }}
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
                  'The email field must be a valid email address',
                  'Invalid credentials'
                ].includes(authStore.warningResponse)
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
                  'Invalid credentials'
                ].includes(authStore.warningResponse)
              }"
              type="password"
              class="w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              v-model="remember_me"
              id="remember"
              type="checkbox"
              class="relative h-5 w-5 cursor-pointer appearance-none rounded-md border bg-white after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:content-['\2713'] checked:border-0 checked:bg-green-500"
            />
            <label
              for="remember"
              class="ms-2 cursor-pointer text-sm font-medium text-green-500 hover:text-green-600"
              >Remember me</label
            >
          </div>
          <div>
            <router-link
              :to="{ name: 'password.reset' }"
              class="text-sm font-medium text-green-500 hover:text-green-600"
              >Forgot password?
            </router-link>
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
          Sign in
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

const email = ref('')
const password = ref('')
const remember_me = ref(false)

async function signIn() {
  await authStore.auth(
    {
      email: email.value,
      password: password.value,
      remember_me: remember_me.value
    },
    'signin'
  )
}
</script>
