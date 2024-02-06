import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '@/views/Home.vue'
import Signin from '@/views/Auth/Signin.vue'
import Signup from '@/views/Auth/Signup.vue'
import UsersIndex from '@/views/Users/Index.vue'
import Show from '@/views/Users/Show.vue'
import Edit from '@/views/Users/Edit.vue'
import Create from '@/views/Users/Create.vue'
import ProfileIndex from '@/views/Users/Profile/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: Home
    },
    {
      path: '/auth/signup',
      name: 'signup',
      meta: { title: 'Sign up' },
      component: Signup
    },
    {
      path: '/auth/signin',
      name: 'signin',
      meta: { title: 'Sign in' },
      component: Signin
    },
    {
      path: '/users/index',
      name: 'users.index',
      meta: { title: 'Users' },
      component: UsersIndex
    },
    {
      path: '/users/show/:id',
      name: 'users.show',
      meta: { title: 'Show user' },
      component: Show
    },
    {
      path: '/users/edit/:id',
      name: 'users.edit',
      meta: { title: 'Edit user' },
      component: Edit
    },
    {
      path: '/users/create',
      name: 'users.create',
      meta: { title: 'Create user' },
      component: Create
    },
    {
      path: '/users/profile',
      name: 'users.profile',
      meta: { title: 'User profile' },
      component: ProfileIndex
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.name === 'signin' && localStorage.getItem('access_token')) {
    next({ name: 'home' })
  } else if (to.name === 'signup' && localStorage.getItem('access_token')) {
    next({ name: 'home' })
  } else if (
    to.name === 'users.index' &&
    !localStorage.getItem('access_token')
  ) {
    next({ name: 'signin' })
  } else if (
    to.name === 'users.show' &&
    !localStorage.getItem('access_token')
  ) {
    next({ name: 'signin' })
  } else if (
    to.name === 'users.edit' &&
    !localStorage.getItem('access_token')
  ) {
    next({ name: 'signin' })
  } else if (
    to.name === 'users.create' &&
    !localStorage.getItem('access_token')
  ) {
    next({ name: 'signin' })
  } else if (
    to.name === 'users.profile' &&
    !localStorage.getItem('access_token')
  ) {
    next({ name: 'signin' })
  } else {
    authStore.error = null
    next()
  }

  document.title = to.meta?.title ?? 'App Vue3 JWT Auth'
})

export default router
