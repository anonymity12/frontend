<template>
  <el-container class="home-container">
    <!-- 主体， 宝岛：脸面，一进来 就是 pet 与 小星星 数量 页面 -->
      <el-main>
        <stars-area></stars-area>
        <award-card-area></award-card-area>
      </el-main>
  </el-container>
</template>

<script>
import AwardCardArea from '../components/AwardCardArea.vue'
import StarsArea from '../components/StarsArea.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
export default {
  name: "Baodao",
  data() {
    return {
    };
  },
  components: {
    AwardCardArea,
    StarsArea,
    BottomNavigation
  }
};
</script>

<style >
.home-container {
  background-color: #FFF1CB;
}
</style>
