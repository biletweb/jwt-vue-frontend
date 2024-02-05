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
      <span class="text-2xl">Show user</span>
    </div>
    <div>
      <span class="text-2xl">{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios/api'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const user = ref('')

onMounted(async () => {
  try {
    const response = await api.get(`/users/show/${route.params.id}`)
    user.value = response.data
  } catch (error) {
    if (error.response.data.error.message === 'User not found') {
      router.push({ name: 'users.index' })
    }
    console.log('Failed to load data')
  }
})
</script>
