<template>
  <el-container class="home-container">
    <!-- 主体， 宝岛：脸面，一进来 就是 pet 与 小星星 数量 页面 -->
    <el-container>
      <el-main>
        <award-card-area></award-card-area>
      </el-main>
    </el-container>
    <div style="height: 40px;">
    </div>
    <bottom-navigation></bottom-navigation>
  </el-container>
</template>

<script>
import AwardCardArea from '../components/AwardCardArea.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
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
    },
  },
  created() {
    this.setUpOwner()
  },
  components: {
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
