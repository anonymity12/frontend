import Vue from 'vue'
import Router from 'vue-router'
import Yueyue from '@/components/Yueyue'
import Xinxin from '@/components/Xinxin'
import Guoguo from '@/components/Guoguo'
import PostLine from '@/components/PostLine'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      hidden: true,
      component: Home
    }, 
    {
      path: '/yy',
      name: 'Yueyue',
      component: Yueyue
    },
    {
      path: '/xx',
      name: 'Xinxin',
      component: Xinxin
    },
    {
      path: '/gg',
      name: '',
      component: Guoguo,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/valley',
      name: 'PostLine',
      component: PostLine
    }
  ]
})
