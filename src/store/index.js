//index.js
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
export default new vuex.Store({
  state:{
    //界面切换
    menu_text: 'index',
    //用户信息切换
    list_title: '账号信息',
    //余额
    surplus_money: '0.00',
    //登录时候使用的随机数
    identifyCode: '',
    //账号信息,验证是否登录
    user: window.localStorage.getItem('user'),
    //用户的JSON对象
    JSON_user: JSON.parse(window.localStorage.getItem('user')),
    //储存搜索信息
    search_keyword: window.localStorage.getItem('search_keyword'),
    //储存搜索的mode
    search_mode: window.localStorage.getItem('search_mode')
  },
  mutations: {
  }
})
