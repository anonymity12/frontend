<template>
  <el-container class="home-container">
    <!-- 主体， 宝岛：脸面，一进来 就是 我的本周小星 数量 和 其他人 本周小星 数量 页面 -->
      <el-main>
        <stars-area></stars-area>
        <StarRaceBay/>
        <div style="height: 60px;"></div>
      </el-main>
  </el-container>
</template>

<script>
import StarsArea from '../components/StarsArea.vue'
import StarRaceBay from '../components/StarRaceBay.vue'
export default {
  name: "Baodao",
  data() {
    return {
    };
  },
  components: {
    StarsArea,
    StarRaceBay
  }
};
</script>

<style>
.home-container {
  background-color: #FFF1CB;
}

</style>
