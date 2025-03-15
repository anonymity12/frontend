import Vue from 'vue'
import Router from 'vue-router'
import Yueyue from '@/components/Yueyue'
import Xinxin from '@/components/Xinxin'
import Guoguo from '@/components/Guoguo'
import PostLine from '@/components/PostLine'
import Login from '@/views/login.vue'
import Baodao from '@/components/Baodao'
import XuanGuan from '@/components/XuanGuan'
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
import SportCompetition from '@/components/SportCompetition'
import JiaPuSunburst from '@/components/JiaPuSunburst'
import TaskMatrix from '@/components/TaskMatrix'
import StarBubbleBay from '@/components/StarBubbleBay'
import UseStarImageCircle from '@/components/UseStarImageCircle'
import StarWeeklySummaryPage from '@/components/StarWeeklySummaryPage'
import StarRoad from '@/components/StarRoad'
import SixLog2 from '@/components/SixLog2'
import PrizeWheel from '@/components/PrizeWheel'
import Today from '@/components/Today'
import MeAndFriendsRanks from '@/components/MeAndFriendsRanks'
import HomePage from '@/views/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: HomePage
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
       // baodao 是第一个页面，装载宠物和奖励
      path: '/baodao',
      name: 'Baodao',
      component: Baodao,
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
      name: 'SixLog2',
      component: SixLog2,
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
      path: '/ranksOld',
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
    {
      path: '/sportcompetition',
      name: 'SportCompetition',
      component: SportCompetition,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/taskmatrix',
      name: 'TaskMatrix',
      component: TaskMatrix,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/starbubblebay',
      name: 'StarBubbleBay',
      component: StarBubbleBay,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/starimage',
      name: 'UseStarImageCircle',
      component: UseStarImageCircle,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/weeklySummary',
      name: 'StarWeeklySummaryPage',
      component: StarWeeklySummaryPage,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/starRoad',
      name: 'StarRoad',
      component: StarRoad,
      
    },
    {
      path: '/prizeWheel',
      name: 'PrizeWheel',
      component: PrizeWheel,
    },
    {
      path: '/today',
      name: 'Today',
      component: Today,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/ranks',
      name: 'MeAndFriendsRanks',
      component: MeAndFriendsRanks,
      meta: {
        requireAuth: true
      },
    },
  ]
})
