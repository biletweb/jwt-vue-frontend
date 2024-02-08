<template>
  <div>
    <span class="text-2xl">Email confirmation</span>
  </div>

  <button
    @click="confirmEmail(token, user)"
    class="mt-5 rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
  >
    Complete registration
  </button>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import api from '@/axios/api'

const route = useRoute()
const router = useRouter()

const token = route.params.token
const user = route.params.user

async function confirmEmail($token, $user) {
  try {
    await api.get(`/auth/email/confirm/${$token}/${$user}`)
    alert('Email confirmed')
    router.push({ name: 'users.index' })
  } catch (error) {
    switch (error.response.data.error.message) {
      case 'Invalid email verification token':
        console.log('Invalid email verification token')
        alert('Invalid email verification token')
        break
      case 'User not found':
        console.log('User not found')
        alert('User not found')
        break
      default:
        console.log('Something went wrong')
        alert('Something went wrong')
        break
    }
  }
}
</script>
