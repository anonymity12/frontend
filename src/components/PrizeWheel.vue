<template>
  <div class="tips-and-wheel-container">
    <div class="background-section">
      <div class="goback-button">
        <a style="font-size: large;" @click="goBack">⬅</a>
      </div>
      <div class="status-bar">
        <span class="user-name">{{ this.$store.state.user.cname }}</span>
        <span class="coins">💰 {{ this.$store.state.coins }}</span>
      </div>
    </div>
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
    <el-dialog
      :visible.sync="dialogVisible"
      width="70vw"
      center
      :show-close="false"
      >
      <div class="prize-dialog-content">
        <h3>恭喜您获得</h3>
        <br>
        <br>
        <img :src="selectedPrize.icon" :alt="selectedPrize.name" class="prize-dialog-img">
        <p>{{ selectedPrize.name }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
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
        { name: '商业家', icon: require('@/assets/img/money_icon.png') },
        { name: '发1元红包', icon: require('@/assets/img/red_packet.png') },
        { name: '战争领主', icon: require('@/assets/img/red_packet.png') },
        { name: '宗教教主', icon: require('@/assets/img/money_icon.png') },
      ],
      isSpinning: false,
      rotationDegrees: 0,
      userName: '张三',
      coins: 100,
      dialogVisible: false,
      selectedPrize: {
        name: '感谢参与',
        icon: require('@/assets/img/gratitude-1024.png')
      },
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
        this.selectedPrize = this.prizes[finalPrizeIndex-1];
        
      }, 10000);
      setTimeout(() => {
        this.dialogVisible = true;
      }, 11000);
    },
    goBack() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.tips-and-wheel-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: auto;
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
.wheel-container {
  width: 90vw;
  height: 90vw;
  top: 100px;
  position: relative;
  margin: auto;
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

/* Add new styles for dialog content */
.prize-dialog-content {
  text-align: center;
}

.prize-dialog-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 15px;
}

</style>