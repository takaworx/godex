import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API
})

Vue.use(VueAxios, http)
