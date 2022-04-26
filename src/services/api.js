import axios from 'axios'
import localforage from 'localforage'

const api = axios.create({
  baseURL: process.env.VUE_APP_API
})

localforage.getItem('token')
  .then(token => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  })

const get = (request, successHandler, errorHandler) => {
  api.get(request.url, request.config)
    .then(successHandler)
    .catch(errorHandler)
}

const post = async (request, successHandler, errorHandler) => {
  api.post(request.url, request.payload, request.config)
    .then(successHandler)
    .catch(errorHandler)
}

export default {
  get,
  post
}
