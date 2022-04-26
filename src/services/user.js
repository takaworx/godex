import api from '@/services/api'

const getUser = () => {
  return new Promise((resolve, reject) => {
    api.get({
      url: '/v1/user'
    }, (res) => {
      resolve(res.data)
    }, (err) => {
      reject(err?.response?.data ?? err)
    })
  })
}

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    api.post({
      url: '/v1/login'
    }, (res) => {
      resolve(res.data)
    }, (err) => {
      reject(err?.response?.data ?? err)
    })
  })
}

export default {
  getUser,
  login
}
