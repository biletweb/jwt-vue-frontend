<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <router-link :to="{ name: 'home' }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </router-link>
      <span class="text-2xl">Users</span>
    </div>

    <div>
      <router-link :to="{ name: 'users.create' }">
        <button class="rounded-lg bg-green-500 p-1 text-white hover:bg-green-600"><span class="mx-2">Create user</span></button>
      </router-link>
    </div>
  </div>

  <div class="relative mx-auto mt-5 w-6/12 overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="bg-slate-100 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody v-if="users.length > 0">
        <tr v-for="(user, index) in users" :key="user.id" :class="{ 'border-b': index !== users.length - 1 }" class="bg-white">
          <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{{ user.id }}</th>
          <td class="px-6 py-4">{{ user.name }}</td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4">
            <div class="flex gap-3">
              <router-link :to="{ name: 'users.show', params: { id: user.id } }" class="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </router-link>
              <router-link :to="{ name: 'users.edit', params: { id: user.id } }" class="text-green-500 hover:text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </router-link>
              <button v-if="user.id !== authStore.userInfo.user_id" @click="deleteUser(user.id)" class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4" class="bg-white p-1 text-center">Loading...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios/api'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const users = ref('')

onMounted(async () => {
  await loadData()
})

async function loadData() {
  try {
    const response = await api.get(`/users/all`)
    users.value = response.data
  } catch (error) {
    console.log('Failed to load data')
  }
}

async function deleteUser(userId) {
  const confirmed = window.confirm('Are you sure you want to delete this user?')

  if (confirmed) {
    try {
      const response = await api.delete(`/users/delete/${userId}`)
      alert(response.data.message)
      await loadData()
    } catch (error) {
      switch (error.response.data.error.message) {
        case 'Too Many Requests':
          alert('Too many requests')
          break
      }
    }
  }
}
</script>
