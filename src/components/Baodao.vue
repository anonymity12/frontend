<template>
  <el-container class="home-container">
    <el-header>
      <div class="status-bar">
          <span class="user-name">{{ this.$store.state.user.cname }}</span>
          <span class="coins">💰 {{ this.$store.state.coins }}</span>
      </div>
    </el-header>
    <!-- 主体， 宝岛：脸面，一进来 就是 我的本周小星 数量 和 其他人 本周小星 数量 页面 -->
    <el-main>
        <stars-area @refreshStarRaceBay="refreshRaceCondition" ref="childA"/>
        <StarRaceBay ref="childB"/>
        <div style="height: 60px;"></div>
    </el-main>
    <bottom-navigation></bottom-navigation>
  </el-container>
</template>

<script>
import StarsArea from '../components/StarsArea.vue'
import StarRaceBay from '../components/StarRaceBay.vue'
import BottomNavigation from '../components/BottomNavigation.vue'

import { apiGetMyGold } from '@/api/gold'

export default {
  name: "Baodao",
  data() {
    return {
    };
  },
  methods: {
    refreshRaceCondition() {
      console.log("refresh childB starRaceBay")
      this.$refs.childB.getStarRecordsOfAllUsersRecently();
    },
    refreshCoins() {
      console.log("refresh coins")
      apiGetMyGold().then(res => {
        console.log("refresh coins res: ", res)
        this.$store.commit('SET_COINS', res.data.obj);
      });
    }
  },
  mounted() {
    this.refreshCoins();
  },
  components: {
    StarsArea,
    StarRaceBay,
    BottomNavigation
  }
};
</script>

<style>
.home-container {
  background-color: #FFF1CB;
}

.status-bar {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 15px;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 20px;
}

.goback-button {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    gap: 15px;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 20px;
}

</style>
