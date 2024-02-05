<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between">
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
      <span class="text-2xl">Edit user</span>
    </div>
    <div>
      <!-- <span class="text-2xl">{{ user.name }}, {{ user.email }}</span> -->
    </div>
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
              type="text"
              v-model="user.name"
              :class="{
                'border-red-500': [
                  'The name field is required',
                  'The name field must be between 2 and 100 characters'
                ].includes(error)
              }"
              class="border-1 w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
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
              type="text"
              v-model="user.email"
              :class="{
                'border-red-500': [
                  'The email field is required',
                  'The email has already been taken',
                  'The email field must be a valid email address'
                ].includes(error)
              }"
              class="border-1 w-full rounded-lg border p-2 pl-10 text-slate-400 focus:outline-none"
              placeholder="Email"
            />
          </div>
        </div>
        <button
          @click="updateUser"
          class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Update user
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios/api'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const user = ref('')
const authStore = useAuthStore()
const error = ref('')

onMounted(async () => {
  await loadData()
})

async function loadData() {
  try {
    const response = await api.get(`/users/edit/${route.params.id}`)
    user.value = response.data
  } catch (error) {
    console.log('Failed to load data')
  }
}

async function updateUser() {
  const confirmed = window.confirm('Are you sure you want to update this user?')

  if (confirmed) {
    try {
      await api.put(`/users/update/${route.params.id}`, {
        name: user.value.name,
        email: user.value.email
      })
      alert('User updated successfully')
      if (authStore.userInfo.user_id == route.params.id) {
        localStorage.setItem('user_name', user.value.name)
        authStore.userInfo.user_name = user.value.name
      }
      router.push({
        name: 'users.index',
        query: { return_page: route.query.return_page }
      })
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'Too Many Requests':
          error.value = 'Too many requests'
          break
        case 'The name field is required.':
          error.value = 'The name field is required'
          break
        case 'The name field must be between 2 and 100 characters.':
          error.value = 'The name field must be between 2 and 100 characters'
          break
        case 'The email field is required.':
          error.value = 'The email field is required'
          break
        case 'The email field must be a valid email address.':
          error.value = 'The email field must be a valid email address'
          break
        case 'The email has already been taken.':
          error.value = 'The email has already been taken'
          break
      }
      await loadData()
    }
  }
}
</script>
