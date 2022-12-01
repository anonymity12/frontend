import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodChild from '@/components/GoodChild'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodChild',
      component: GoodChild
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
