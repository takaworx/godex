import Vue from 'vue'
import VueRouter from 'vue-router'

import RedirectUnauthenticated from '@/guards/redirect-unauthenticated'

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

import HomeView from '@/views/HomeView.vue'
import UserListView from '@/views/UserListView.vue'
import UserView from '@/views/UserView.vue'
import SearchView from '@/views/SearchView'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AuthenticatedLayout,
    beforeEnter: RedirectUnauthenticated,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'users',
        name: 'user-list',
        component: UserListView
      },
      {
        path: 'users/:id',
        name: 'user',
        component: UserView
      },
      {
        path: 'search',
        name: 'search',
        component: SearchView
      }
    ]
  },
  {
    path: '/login',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: LoginView
      }
    ]
  },
  {
    path: '/register',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'register',
        component: RegisterView
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
