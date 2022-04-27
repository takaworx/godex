import Vue from 'vue'
import storage from '@/abstract/storage'

const getUser = () => {
  return new Promise((resolve, reject) => {
    Vue.axios.get('/v1/user')
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/v1/login', {
      email,
      password
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

const saveAccessToken = async (token) => {
  await storage.setItem('token', token)
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default {
  getUser,
  login,
  saveAccessToken
}
