import Vue from 'vue'
import Router from 'vue-router'
import Yueyue from '@/components/Yueyue'
import Xinxin from '@/components/Xinxin'
import Guoguo from '@/components/Guoguo'
import PostLine from '@/components/PostLine'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import XuanGuan from '@/components/XuanGuan'
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
import SleepRecord from '@/components/SleepRecord'
import ShitRecord from '@/components/ShitRecord'
import JiaPuSunburst from '@/components/JiaPuSunburst'

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
      // xuanguan 类似于玄关，中台，它是你进入大门 gate1 后，想进一步探索 gww 世界的 gate2
      path: '/xuanguan',
      name: 'XuanGuan',
      component: XuanGuan,
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
      component: PostLine,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/sixlog',
      name: 'SixLog',
      component: SixLog,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/routine',
      name: 'Routine',
      component: RoutinePage,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/sixlog/article',
      name: 'LogDetail',
      component: LogDetail,
      meta: {
        requireAuth: true
      },
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
      component: Profile,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/ranks',
      name: 'RankList',
      component: RankList,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/tomato',
      name: 'TomatoTimer',
      component: TomatoTimer,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/square',
      name: 'CardSquare',
      component: CardSquare,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/trainstations',
      name: 'TrainStations',
      component: TrainStations,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/sleeprecord',
      name: 'SleepRecord',
      component: SleepRecord,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/jiapusunburst',
      name: 'JiaPuSunburst',
      component: JiaPuSunburst,
      meta: {
        requireAuth: true
      },
    }, 
    {
      path: '/shitrecord',
      name: 'ShitRecord',
      component: ShitRecord,
      meta: {
        requireAuth: true
      },
    },
  ]
})
