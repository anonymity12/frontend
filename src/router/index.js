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
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
       // home页面并不需要被访问，只是作为其它组件的父组件
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
      redirect: '/index',
      children:[
        {
          path:'/index',
          name:'Index',
          component:() => import('@/views/home/index'),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/user',
          name:'User',
          component:()=>import('@/views/user/index'),
          meta:{
            requireAuth:true
          }
        }
      ]
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
      path: '/valley',
      name: 'PostLine',
      component: PostLine
    }
  ]
})
