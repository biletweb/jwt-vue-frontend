<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between">
    <div>
      <span class="text-2xl">User profile</span>
    </div>
    <div>
      <span class="text-2xl">{{ userMe.email }}</span>
    </div>
  </div>

  <div class="mt-5">
    <div class="flex items-center gap-5">
      <AppLoader v-if="loader" class="m-5" />
      <div v-else>
        <img
          @click="updateUserAvatar()"
          class="h-20 w-20 cursor-pointer rounded-full"
          :src="
            !userMe.avatar
              ? '/img/user/avatar/no_avatar.png'
              : $imageUrl + userMe.avatar
          "
          alt=""
        />
      </div>
      <div class="font-medium">
        <div>{{ userMe.name }}</div>
        <div class="text-sm text-gray-500">
          Joined in {{ userMe.created_at }}
        </div>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      style="display: none"
      @change="loadImage"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios/api'
import AppLoader from '@/components/AppLoader.vue'

const userMe = ref([])
const fileInput = ref([])
const loader = ref(false)

async function loadData() {
  try {
    loader.value = true
    const response = await api.post('/auth/me')
    userMe.value = response.data
    loader.value = false
  } catch (error) {
    console.log('Failed to load data')
  }
}

onMounted(async () => {
  await loadData()
})

function updateUserAvatar() {
  fileInput.value.click()
}

async function loadImage(event) {
  const file = event.target.files[0]

  if (file) {
    // Создание объекта FormData для передачи данных
    const formData = new FormData()

    // Добавление данных в объект FormData
    formData.append('avatar', file)
    formData.append('user', userMe.value.id)

    try {
      await api.post(`/users/avatar/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      await loadData()
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'The avatar field must be a file of type: jpeg, jpg, png.':
          alert('The avatar must be a file of type: jpeg, jpg, png')
          break
        case 'The avatar field must not be greater than 1024 kilobytes.':
          alert('The avatar must not be greater than 1 MB')
          break
        case 'The avatar failed to upload.':
          alert('The avatar failed to upload')
          break
        case 'Too Many Requests':
          alert('Too many requests')
          break
      }
    }
  } else {
    alert('No file selected')
  }
}
</script>
