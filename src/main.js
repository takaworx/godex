import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(InfiniteLoading)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
