<template>
  <div class="mx-auto flex min-h-screen flex-col bg-slate-50 p-5 sm:container">
    <div>
      <AppNavbar :token="authData.access_token" />
    </div>
    <div class="my-5 flex-grow">
      <router-view />
    </div>
    <div>
      <Appfooter />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from './stores/auth'
import { computed } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import Appfooter from './components/AppFooter.vue'

const authStore = useAuthStore()

// При обновлении страницы данные теряются из authStore.userInfo, если они есть в localStorage, сохраняем обратно в authStore.userInfo
const updateAuthStore = () => {
  const getToken = localStorage.getItem('access_token')

  if (getToken) {
    authStore.userInfo.access_token = getToken
  }
}

updateAuthStore()

// Если данные (указываем какие) в authStore.userInfo изменятся, то они автоматически обновятся во всех компонентах
const authData = computed(() => {
  return {
    access_token: authStore.userInfo.access_token
  }
})
</script>
