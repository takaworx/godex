import Vue from 'vue'
import VueRouter from 'vue-router'

import RedirectUnauthenticated from '@/guards/redirect-unauthenticated'

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import LoginView from '@/views/LoginView.vue'

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
        path: 'search',
        name: 'search',
        component: SearchView
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
