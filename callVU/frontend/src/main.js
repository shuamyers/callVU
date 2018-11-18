import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import './css/main.css'


Vue.config.productionTip = false

window.axios = axios.create({
  withCredentials: true
});


new Vue({

  render: h => h(App)
}).$mount('#app')
