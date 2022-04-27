import Vue from 'vue'
import storage from '@/abstract/storage'
import UserService from '@/services/user'

export default async function (to, from, next) {
  try {
    const token = await storage.getItem('token')
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    await UserService.getUser()
  } catch (err) {
    console.error(err)
    next({ name: 'login' })
  }

  next()
}
