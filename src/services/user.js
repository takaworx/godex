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

const updateUser = (payload) => {
  payload._method = 'PUT'
  return new Promise((resolve, reject) => {
    Vue.axios.post('/v1/user', payload)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

const findUser = (id) => {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`/v1/user/${id}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

const getUserList = (page) => {
  return new Promise((resolve, reject) => {
    Vue.axios.get(`/v1/users?page=${page}`)
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

const logout = () => {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/v1/logout')
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

const register = (email, password, passwordConfirmation) => {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/v1/register', {
      email,
      password,
      password_confirmation: passwordConfirmation
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
  updateUser,
  findUser,
  getUserList,
  login,
  logout,
  register,
  saveAccessToken
}
