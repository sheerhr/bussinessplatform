import Vue from 'vue'
import App from './App'
import router from'@/login'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index' // 导入vuex文件
import '@/styles/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import '@/assets/icon/font_1570450_60zd7ybadr/iconfont.css'
import VDistpicker from 'v-distpicker'
// 导入全局的样式
import "./assets/css/main.scss"
import './components/common/directives';
import axios from 'axios'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.component('v-distpicker', VDistpicker)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})





