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
    };
  },
  components: {
    AwardCardArea,
    BottomNavigation
  }
};
</script>

<style >
</style>
