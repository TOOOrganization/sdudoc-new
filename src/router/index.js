import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import register from "../components/register"
import login from "../components/Login"
import search from "../components/search"
import userchange from "../components/userchange"
import userinfo from "../components/userinfo"
import avatar from "../components/avatar"
import shistory from "../components/shistory"
import collection from "../components/collection";
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userchange',
      name: 'userchange',
      component: userchange,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: avatar,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/shistory',
      name: 'shistory',
      component: shistory,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection,
      meta: {
        requireAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('user')!=null) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
