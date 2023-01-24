<template>
  <el-container class="home-container">
    <!--顶部-->
    <el-header style="margin-right: 15px; width: 100%">
      <span class="head-intro" >{{this.$store.state.user.intro}}</span>
      <span @click="avatarClick()">
        <el-avatar
          style="color: #222; float: left; margin-top: 20px"
          :src="this.$store.state.user.userface"
          :size="50"
          >
        </el-avatar>
      </span>
      <span 
        style="color: #222; padding-top: 20px;float: left;font-weight: bold;font-size: 20px; margin: 8px"
        >{{ this.$store.state.user.cname }}
      </span>
      <el-button 
        size="small" 
        @click="handleBox" 
        style="float: right"
        >
        查看百宝箱
      </el-button>

    </el-header>
    <!-- 主体 -->
    <el-container>
      <el-main>
        <life-indicator></life-indicator>
        <ButterFlyInfo :fly-owner="pageOwner"></ButterFlyInfo>
        <Baibao :boxShow="boxShow"></Baibao>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ButterFlyInfo from '@/components/ButterFlyInfo'
import Baibao from '@/components/Baibao'
import { pingpong } from "@/api/user"
import LifeIndicator from '../components/LifeIndicator.vue'
export default {
  name: "Home",
  data() {
    return {
      pageOwner: 'gg',
      boxShow: {
        show: false
      },
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
    handleBox() {
      this.boxShow.show = true 
    },
    ping() {
      var _this = this;
      pingpong().then((resp) => {
        console.log("wow ping return: ", resp)
      })
    },
    setOwner() {
      this.pageOwner = this.$store.state.user.name
    },
    avatarClick() {
      console.log("avatar clicked")
    },
  },
  created() {
    this.setOwner()
  },
  components: {
    ButterFlyInfo,
    Baibao,
    LifeIndicator
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
  position: absolute;
  padding-top: 20px;
  right: 15%;
  font-size: 10px;
  font-weight: bold;
}


</style>
