import Vue from 'vue'
import storage from '@/abstract/storage'
import UserService from '@/services/user'

import store from '@/store/index'

export default async function (to, from, next) {
  try {
    const token = await storage.getItem('token')
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const user = await UserService.getUser()
    store.commit('setUser', user.data)
  } catch (err) {
    console.error(err)
    next({ name: 'login' })
  }

  next()
}
