<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center">
    <div class="w-4/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <h1 class="mb-4 text-2xl font-bold">Sign up</h1>
        <div
          v-if="authStore.error"
          class="mb-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700"
        >
          {{ authStore.error }}
        </div>
        <input
          v-model="name"
          :class="{
            'border-red-500': [
              'The name field is required',
              'The name field must be between 2 and 100 characters'
            ].includes(authStore.error)
          }"
          type="text"
          class="border-1 rounded-lg border p-2 focus:outline-none"
          placeholder="Name"
        />
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
          class="border-1 rounded-lg border p-2 focus:outline-none"
          placeholder="Email"
        />
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
          class="border-1 rounded-lg border p-2 focus:outline-none"
          placeholder="Password"
        />
        <input
          v-model="password_confirmation"
          :class="{
            'border-red-500': [
              'The password field confirmation does not match'
            ].includes(authStore.error)
          }"
          type="password"
          class="border-1 rounded-lg border p-2 focus:outline-none"
          placeholder="Password confirmation"
        />
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
