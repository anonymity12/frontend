<template>
  <el-container class="home-container">
    <!--顶部-->
    <el-header style="width: 100%; height: auto;" align="middle">
      <el-col :span="8" style="padding-top: 20px;">
        <span @click="avatarClick()" type="flex" justify="center">
          <el-avatar
          :src="this.$store.state.user.userface"
          :size="100"
          >
          </el-avatar>
        </span>
      </el-col>
      
      <el-col :span="16" >
        <el-row type="flex" justify="start" style="margin-left: 20px;">
          <p 
          style="color: #222; padding-top: 20px;font-weight: bold;font-size: 20px; font-family:'Times New Roman', Times, serif;"
          >{{ this.$store.state.user.cname }}
          </p>
        </el-row>
        <el-row type="flex" justify="start" style="margin-left: 20px;">
          <el-tag>
          {{this.$store.state.user.intro}}
          </el-tag>
        </el-row>
        <el-row type="flex" justify="start" style="margin-left: 20px;">
          <el-tag>
            🦋{{ this.growFlyCnt }}
          </el-tag>
          <el-tag>
            🥚{{ this.babyFlyCnt }}
          </el-tag>
          <el-tag>
            🐛{{ this.diedFlyCnt }}
          </el-tag>
        </el-row>
      </el-col>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <el-main>
        <life-indicator></life-indicator>
        <tasks></tasks>
        <ButterFlyInfo :fly-owner="pageOwner"></ButterFlyInfo>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ButterFlyInfo from '@/components/ButterFlyInfo'
import { apiGetMyCntOverview } from "@/api/user"
import LifeIndicator from '../components/LifeIndicator.vue'
import Tasks from '../components/Tasks.vue'
export default {
  name: "Home",
  data() {
    return {
      pageOwner: 'gg',
      growFlyCnt: 0,
      diedFlyCnt: 0,
      babyFlyCnt: 0,
      user: {
        birthday: '',
        name: '',
        cname: '',
        intro: '',
        userface: '',
        address: '',
        phone: '',
      },
    };
  },
  methods: {
    ping() {
      var _this = this;
      pingpong().then((resp) => {
        console.log("wow ping return: ", resp)
      })
    },
    setUpOwner() {
      this.pageOwner = this.$store.state.user.name
      apiGetMyCntOverview().then((resp)=> {
        if (resp.data.status == 200) {
          console.log("getMyCntOverview ok: ", resp.data.obj)
          this.growFlyCnt = resp.data.obj.growFlyCnt
          this.babyFlyCnt = resp.data.obj.babyFlyCnt
          this.diedFlyCnt = resp.data.obj.diedFlyCnt
        }
      })
    },
    avatarClick() {
      console.log("avatar clicked")
      this.$router.push({path: '/profile'})
    },
  },
  created() {
    this.setUpOwner()
  },
  components: {
    ButterFlyInfo,
    LifeIndicator,
    Tasks
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
