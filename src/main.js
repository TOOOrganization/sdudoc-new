// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import Vuetify from 'vuetify' // 使用vuetify UI框架
import 'vuetify/dist/vuetify.min.css' // 导入 vuetify样式

Vue.use(Vuetify) // 使用 vuetify
export default new Vuetify({}) // 导出vuetify对象 不然会报错

import menu from './components/component/menu'
Vue.component('yx-menu', menu);

import search from "./components/component/search"
Vue.component('yx-search',search);

import CAPTCHA from "./components/component/CAPTCHA"
Vue.component('yx-identify',CAPTCHA);

import login from "./components/component/login"
Vue.component("yx-login",login);

import user from "./components/component/user"
Vue.component("yx-user",user)

import navigation from "./components/component/navigation";
Vue.component("yx-navigation",navigation)

import keyword from "./components/component/keyword";
Vue.component("yx-keyword",keyword)

import surplus from "./components/component/surplus";
Vue.component("yx-surplus",surplus)

import store from './store/index'

// 引入 axios
import axios from 'axios'
Vue.prototype.$http = axios

import qs from 'qs'
Vue.prototype.qs=qs

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})
