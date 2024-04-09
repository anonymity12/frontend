<template>
  <el-container class="home-container">
    <!-- 主体： 入门玄关 -->
    <el-container>
      <el-main>
        <extra-area></extra-area>
      </el-main>
    </el-container>
    <div style="height: 40px;">
    </div>
    <bottom-navigation></bottom-navigation>
  </el-container>
</template>

<script>
import BottomNavigation from '@/components/BottomNavigation.vue'
import VueHmCalendar from '@/components/VueHmCalendar'
import { apiGetMyGold } from "@/api/gold"
import { apiQueryAllCommitOfMine } from "@/api/commitsView"
import LifeIndicator from '../components/LifeIndicator.vue'
import ExtraArea from '../components/ExtraArea.vue'
import TaskMatrix from '../components/TaskMatrix.vue'
import AwardCardArea from '../components/AwardCardArea.vue'
export default {
  name: "Home",
  data() {
    return {
      pageOwner: 'gg',
      user: {
        birthday: '',
        name: '',
        cname: '',
        intro: '',
        userface: '',
        address: '',
        phone: '',
      },
      commitEvents: Object,
      balance: 0,
    };
  },
  methods: {
    setUpOwner() {
      this.pageOwner = this.$store.state.user.name
      apiGetMyGold().then((resp) => {
        if (resp.data.status == 200) {
          this.balance = resp.data.obj
        }
      })
    },
    avatarClick() {
      console.log("avatar clicked")
      this.$router.push({ path: '/profile' })
    },
    constructCommitView() {
      apiQueryAllCommitOfMine().then(resp => {
        if (resp.data.status == 200) {
          var pureBean = resp.data.obj
          var convertedBean = {}
          pureBean.forEach(function (item) {
            convertedBean[item.simplifiedDateString] = item.count
          })
          this.commitEvents = convertedBean
        } else {
          console.log("get commit view err: ", resp)
        }
      })
    },
    onChangeTaskStatusEvent(taskId) {
      setTimeout(() => { this.constructCommitView() }, 1000)
    }
  },
  created() {
    this.setUpOwner()
    this.constructCommitView()
  },
  components: {
    LifeIndicator,
    VueHmCalendar,
    ExtraArea,
    AwardCardArea,
    TaskMatrix,
    AwardCardArea,
    BottomNavigation
  }
};
</script>

<style >
.nav-logo {
  position: absolute;
  padding-top: -1%;
  left: 5%;
  font-size: 40px;
}

.head-intro {
  float: left;
  margin-left: 20px;

  font-size: 10px;
  font-weight: bold;
}
</style>
