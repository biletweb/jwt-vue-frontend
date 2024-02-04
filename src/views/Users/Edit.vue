<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <router-link :to="{ name: 'users.index' }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </router-link>
      <span class="text-2xl">Edit user</span>
    </div>
    <div>
      <!-- <span class="text-2xl">{{ user.name }}, {{ user.email }}</span> -->
    </div>
  </div>

  <div class="mt-5 flex justify-center">
    <div class="w-6/12 rounded-2xl border bg-white p-5">
      <div class="flex flex-col gap-5">
        <div v-if="error" class="my-5 rounded-r-lg border-l-4 border-yellow-500 bg-amber-100 p-5 text-yellow-700">{{ error }}</div>
        <input type="text" v-model="user.name" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Name" />
        <input type="text" v-model="user.email" class="border-1 rounded-lg border p-2 focus:outline-none" placeholder="Email" />
        <button @click="updateUser" class="mt-5 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600">Update user</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios/api'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
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
      router.push({ name: 'users.index' })
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
