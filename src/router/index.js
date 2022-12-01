import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ButterFlyInfo from '@/components/ButterFlyInfo'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ButterFlyInfo',
      component: ButterFlyInfo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
