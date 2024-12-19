<template>
  <div class="wheel-container">
    <div class="wheel" :style="wheelStyle">
      <!-- 中心按钮 -->
      <div class="wheel-center">
        <button @click="startSpin">点击抽奖</button>
      </div>
      
      <!-- 10个奖品扇区 -->
      <div class="prize-section" v-for="(prize, index) in prizes" :key="index"
           :style="{ transform: `rotate(${index * 36}deg)` }">
        <div class="prize-content">
          <img v-if="prize.icon" :src="prize.icon" :alt="prize.name">
          <span class="prize-text">{{ prize.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prizes: [
        { name: 'iPhone X', icon: 'path/to/iphone-icon.png' },
        { name: '100元现金', icon: 'path/to/cash-icon.png' },
        { name: '10元现金', icon: 'path/to/cash-icon.png' },
        { name: '5元现金', icon: 'path/to/cash-icon.png' },
        { name: '50元现金', icon: 'path/to/cash-icon.png' },
        { name: '20元现金', icon: 'path/to/cash-icon.png' },
        { name: '30-50元现金', icon: 'path/to/cash-icon.png' },
        { name: '20元现金', icon: 'path/to/cash-icon.png' },
        { name: '50元现金', icon: 'path/to/cash-icon.png' },
        { name: '5元现金', icon: 'path/to/cash-icon.png' },
      ],
      isSpinning: false,
      rotationDegrees: 0
    }
  },
  computed: {
    wheelStyle() {
      return {
        transform: `rotate(${this.rotationDegrees}deg)`,
        transition: this.isSpinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none'
      }
    }
  },
  methods: {
    startSpin() {
      if (this.isSpinning) return;
      
      this.isSpinning = true;
      // 随机旋转5-10圈（1800-3600度）再加上一个随机角度
      const extraSpins = Math.floor(Math.random() * 5 + 5) * 360;
      const extraDegrees = Math.floor(Math.random() * 360);
      this.rotationDegrees += extraSpins + extraDegrees;

      // 动画结束后重置状态
      setTimeout(() => {
        this.isSpinning = false;
      }, 5000);
    }
  }
}
</script>

<style scoped>
.wheel-container {
  width: 400px;
  height: 400px;
  position: relative;
  margin: auto;
}

.wheel {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  background: #FFB800;
  border: 8px solid #FFB800;
  box-shadow: 0 0 0 15px rgba(255, 184, 0, 0.3);
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: #FF4444;
  border-radius: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-center button {
  border: none;
  background: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.prize-section {
  position: absolute;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
  left: 50%;
  top: 0;
  border-left: 2px solid #FFB800;
}

.prize-content {
  position: absolute;
  left: 30px;
  top: 35px;
  transform: rotate(90deg);
  text-align: center;
  width: 100px;
}

.prize-text {
  color: #FF4444;
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-top: 5px;
}

.prize-content img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}
</style>