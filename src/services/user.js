import api from '@/services/api'

const getUser = () => {
  return new Promise((resolve, reject) => {
    api.get('/v1/user', (res) => {
      resolve(res.data)
    }, (err) => {
      reject(err.response.data)
    })
  })
}

export {
  getUser
}
