<template>
  <div id="wheel-container">
    <div class="wheel" ref="wheel">
      <div class="prize" v-for="(prize, index) in prizes" :key="index">{{ prize }}</div>
    </div>
    <el-button @click="startSpin">开始抽奖</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prizes: [
        '奖品1',
        '奖品2',
        '奖品3',
        '奖品4',
        '奖品5',
        '奖品6',
        '奖品7'
      ],
      spinning: false,
      rotateDegree: 0
    }
  },
  methods: {
    startSpin() {
      if (!this.spinning) {
        this.spinning = true;
        const totalDegrees = 360 * 5 + Math.floor(Math.random() * 360);  // 转动几圈后随机停在一个角度，这里转5圈多
        const duration = 5000;  // 转动总时长（5秒），可根据实际调整
        const step = (totalDegrees / (duration / 16.67));  // 每16.67ms（一帧的大致时间）转动的角度，计算步长
        const spinInterval = setInterval(() => {
          this.rotateDegree += step;
          this.$refs.wheel.style.transform = `rotate(${this.rotateDegree}deg)`;
          if (this.rotateDegree >= totalDegrees) {
            clearInterval(spinInterval);
            this.spinning = false;
            this.rotateDegree = 0;
          }
        }, 16.67);
      }
    }
  }
}
</script>

<style scoped>
#wheel-container {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: relative;
}
.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
}
.prize {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.prize:nth-child(1) {
  transform: rotate(0deg);
}
.prize:nth-child(2) {
  transform: rotate(51.43deg);  // 360/7约为51.43度，划分7个区域
}
.prize:nth-child(3) {
  transform: rotate(102.86deg);
}
.prize:nth-child(4) {
  transform: rotate(154.29deg);
}
.prize:nth-child(5) {
  transform: rotate(205.72deg);
}
.prize:nth-child(6) {
  transform: rotate(257.15deg);
}
.prize:nth-child(7) {
  transform: rotate(308.58deg);
}
</style>