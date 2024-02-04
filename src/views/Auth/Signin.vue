<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center">
    <div class="w-4/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <h1 class="mb-4 text-2xl font-bold">Sign in</h1>
        <div v-if="authStore.error" class="mb-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700">{{ authStore.error }}</div>
        <input v-model="email" type="text" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Email" />
        <input v-model="password" type="password" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Password" />
        <div v-if="authStore.loader" class="mt-5 flex justify-center">
          <AppLoader />
        </div>
        <button v-else @click="signIn" class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600">Sign in</button>
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

async function signIn() {
  await authStore.auth({ email: email.value, password: password.value }, 'signin')
}
</script>
