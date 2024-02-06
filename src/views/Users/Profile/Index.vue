<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between">
    <div>
      <span class="text-2xl">User profile</span>
    </div>
    <div>
      <span class="text-2xl">{{ user.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios/api'

const user = ref('')

onMounted(async () => {
  try {
    const response = await api.post(`/auth/me`)
    user.value = response.data
  } catch (error) {
    console.log('Failed to load data')
  }
})
</script>
