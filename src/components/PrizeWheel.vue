<template>
  <div class="wheel-container">
    <div class="wheel" :style="wheelStyle">
      <div class="prize-section" v-for="(prize, index) in prizes" :key="index"
           :style="{ transform: `rotate(${index * 36}deg)` }">
        <div class="prize-content">
          <img v-if="prize.icon" :src="prize.icon" :alt="prize.name">
          <span class="prize-text">{{ prize.name }}</span>
        </div>
      </div>
    </div>
    <div class="wheel-center">
      <div class="pointer"></div>
      <button @click="startSpin">点击抽奖</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prizes: [
        { name: '感谢参与', icon: require('@/assets/img/gratitude-1024.png') },
        { name: '收3元红包', icon: require('@/assets/img/money_icon.png') },
        { name: '发2元红包', icon: require('@/assets/img/red_packet.png') },
        { name: '感谢参与', icon: require('@/assets/img/gratitude-1024.png') },
        { name: '收1元红包', icon: require('@/assets/img/money_icon.png') },
        { name: '再接再厉', icon: require('@/assets/img/gratitude-1024.png') },
        { name: '收2元红包', icon: require('@/assets/img/money_icon.png') },
        { name: '发1元红包', icon: require('@/assets/img/red_packet.png') },
        { name: '发2元红包', icon: require('@/assets/img/red_packet.png') },
        { name: '收1元红包', icon: require('@/assets/img/money_icon.png') },
      ],
      isSpinning: false,
      rotationDegrees: 0
    }
  },
  computed: {
    wheelStyle() {
      return {
        transform: `rotate(${this.rotationDegrees}deg)`,
        transition: this.isSpinning ? 'transform 10s cubic-bezier(0,1.0,0,.99)' : 'none'
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

      // 计算最终选中的奖品索引
      // 1. 获取最终角度（对360取模，得到最后的角度）
      const finalAngle = this.rotationDegrees % 360;
      // 2. 由于轮盘顺时针旋转，需要用360度减去最终角度
      const normalizedAngle = (360 - finalAngle) % 360;
      // 3. 每个奖品占36度(360/10)，除以36得到索引
      const finalPrizeIndex = Math.floor(normalizedAngle / 36);

      // 动画结束后重置状态
      setTimeout(() => {
        this.isSpinning = false;
        console.log('选中的奖品:', this.prizes[finalPrizeIndex-1].name);
      }, 10000);
    }
  }
}
</script>

<style scoped>
.wheel-container {
  width: 90vh;
  height: 90vh;
  position: relative;
  margin: auto;
  max-width: 90vw;
  max-height: 90vw;
}

.wheel {
  position: absolute;
  padding: 3%;
  width: 90%;
  height: 90%;
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
  border-left: 2px solid #000000;
}

.prize-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: rotate(45deg) translateX(-50%);
  text-align: center;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.prize-text {
  color: #f4cfcf;
  background-color: #000000;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 3px;
  white-space: nowrap;
}

.prize-content img {
  width: 25px;
  height: 25px;
  object-fit: contain;
}

.pointer {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #FF4444;
}
</style>