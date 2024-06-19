<template>
  <el-container class="home-container">
    <!-- 主体， 宝岛：脸面，一进来 就是 pet 与 小星星 数量 页面 -->
      <el-main>
        <stars-area></stars-area>
        <StarBubbleBay></StarBubbleBay>
        <!-- StarRacingBay? -->
        <div style="height: 60px;"></div>
      </el-main>
  </el-container>
</template>

<script>
import AwardCardArea from '../components/AwardCardArea.vue'
import StarBubbleBay from '@/components/StarBubbleBay.vue'
import StarsArea from '../components/StarsArea.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
export default {
  name: "Baodao",
  data() {
    return {
    };
  },
  components: {
    StarBubbleBay,
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
