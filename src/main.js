import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'

import './plugins/element.js'

Vue.prototype.$http = axios ;
// 配置请求根路径
axios.defaults.baseURL=`http://127.0.0.1:8088/`
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
