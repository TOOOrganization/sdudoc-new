import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import article from '../components/article'
import register from "../components/register"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
