import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'

import axios from './axios'

import Base64 from 'js-base64'

Vue.use('Base64')

const query =Vue.extend({})
const q = new query
Vue.prototype.queryevent = q

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Element)
require('./mock')


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
