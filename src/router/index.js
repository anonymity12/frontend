import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Yueyue from '@/components/Yueyue'
import Xinxin from '@/components/Xinxin'
import Guoguo from '@/components/Guoguo'
import PostLine from '@/components/PostLine'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
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
      name: 'Guoguo',
      component: Guoguo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/valley',
      name: 'PostLine',
      component: PostLine
    }
  ]
})
