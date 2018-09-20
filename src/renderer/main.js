import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#3d5a6c',
    secondary: '#81807e',
    accent: '#433a3f',
    error: '#da3e52',
    warning: '#f2e94e',
    info: '#bab595',
    success: '#96e6b3'
  }
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
