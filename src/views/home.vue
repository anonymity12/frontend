<template>
  <el-container class="home-container">
    <!--顶部-->
    <el-header style="width: 100%; height: auto;" align="middle">
      <el-col :span="8" style="padding-top: 20px;">
        <span @click="avatarClick()" type="flex" justify="center">
          <el-avatar :src="this.$store.state.user.userface" :size="100">
          </el-avatar>
        </span>
      </el-col>

      <el-col :span="16">
        <el-row type="flex" justify="start" style="margin-left: 20px;">
          <p
            style="color: #222; padding-top: 20px;font-weight: bold;font-size: 20px; font-family:'Times New Roman', Times, serif;">
            {{ this.$store.state.user.cname }}
          </p>
        </el-row>
        <el-row type="flex" justify="start" style="margin-left: 20px;">
          <p style="text-align: left">{{ this.$store.state.user.intro }}</p>
        </el-row>
        <el-row type="flex" justify="start" style="margin-left: 20px;">
          💰：{{ this.balance }}
        </el-row>
      </el-col>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <el-main>
        <life-indicator></life-indicator>
        <award-card-area></award-card-area>
        <vue-hm-calendar :eventsDays="commitEvents" />
        <task-matrix @changeTaskStatusEvent="onChangeTaskStatusEvent"></task-matrix>
        <extra-area></extra-area>
      </el-main>
    </el-container>
    <div style="height: 40px;">
    </div>
  </el-container>
</template>

<script>
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
    AwardCardArea
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
