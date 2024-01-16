import Vue from 'vue'
import Router from 'vue-router'
import Yueyue from '@/components/Yueyue'
import Xinxin from '@/components/Xinxin'
import Guoguo from '@/components/Guoguo'
import PostLine from '@/components/PostLine'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import SixLog from '@/components/SixLog'
import LogDetail from '@/components/LogDetail'
import JiaPu from '@/components/JiaPu'
import JiaPuOperationUI from '@/components/JiaPuOperationUI'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import RankList from '@/components/RankList'
import RoutinePage from '@/components/RoutinePage'
import TomatoTimer from '@/components/TomatoTimer'
import CardSquare from '@/components/CardSquare'
import TrainStations from '@/components/TrainStations'

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
    },
    {
      path: '/sixlog',
      name: 'SixLog',
      component: SixLog
    },
    {
      path: '/routine',
      name: 'Routine',
      component: RoutinePage
    },
    {
      path: '/sixlog/article',
      name: 'LogDetail',
      component: LogDetail
    },    
    {
      path: '/jiapu',
      name: 'JiaPu',
      component: JiaPu
    },    
    {
      path: '/jiapuoperation',
      name: 'JiaPuOperationUI',
      component: JiaPuOperationUI
    },    
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/ranks',
      name: 'RankList',
      component: RankList
    },
    {
      path: '/tomato',
      name: 'TomatoTimer',
      component: TomatoTimer
    },
    {
      path: '/square',
      name: 'CardSquare',
      component: CardSquare
    },
    {
      path: '/trainstations',
      name: 'TrainStations',
      component: TrainStations
    },
  ]
})
