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
            <span class="prize-text">{{ prize.name }}</span>
            <img v-if="prize.icon" :src="prize.icon" :alt="prize.name">
          </div>
        </div>
      </div>
      <div class="wheel-center">
        <div class="pointer"></div>
        <button @click="startSpin">点击抽奖</button>
      </div>
    </div>
    <div class="chalkboard">
      <p>每周获得4星，就会开启幸运转盘</p>
      <p>小赌怡情</p>
      <p>每次20金币</p>
      <p>恭喜发财</p>
    </div>
    <transition name="fade">
      <p v-if="showTip" class="cost-tip">抽奖消耗20金币</p>
    </transition>
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
        <p> <strong>《{{ selectedPrize.name }}》 </strong></p>
        <p>{{ selectedPrize.intro }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
  

</template>

<script>
import { apiDecreaseMyGold } from '@/api/gold'
import { apiIncreaseMyGold } from '@/api/gold'
import { apiGetMyGold } from '@/api/gold'
export default {
  data() {
    return {
      prizes: [
        {intro: '这次感谢你的参与，请再转一次吧', name: '最乖宝宝奖', icon: require('@/assets/img/gratitude-1024.png') },
        {intro: '截图可向天天领取3元红包', name: '幸运小马奖', icon: require('@/assets/img/money_icon.png') },
        {intro: '请你在群里发送3元红包', name: '无私施主奖', icon: require('@/assets/img/red_packet.png') },
        {intro: '这次感谢你的参与，祝你新年喜气洋洋', name: '喜气洋洋奖', icon: require('@/assets/img/gratitude-1024.png') },
        {intro: '用20金币换来40金币，很值得啊！', name: '+40金币', icon: require('@/assets/img/money_icon.png') },
        {intro: '葫芦娃，葫芦娃，一根藤上七朵花，请心里感恩生活一次：健康活着就好！', name: '最乖娃娃奖', icon: require('@/assets/img/gratitude-1024.png') },
        {intro: '总要期待美好的事情发生呀！恭喜你获得100金币', name: '+100金币', icon: require('@/assets/img/money_icon.png') },
        {intro: '请你在群里发送1元红包', name: '鲤鱼奖', icon: require('@/assets/img/red_packet.png') },
        {intro: '请你在群里发送2元红包', name: '劳动模范奖', icon: require('@/assets/img/red_packet.png') },
        {intro: '截图可以获得大家的 祝你健康 的祝福', name: '海鸥奖', icon: require('@/assets/img/money_icon.png') },
      ],
      isSpinning: false,
      rotationDegrees: 0,
      userName: '张三',
      coins: 100,
      dialogVisible: false,
      selectedPrize: {
        name: '感谢参与',
        icon: require('@/assets/img/gratitude-1024.png'),
        intro: '仅仅是个安慰奖'
      },
      showTip: false,
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

      // decrease gold
      var goldAmountHolder = {
        goldAmount: 20
      }
      apiDecreaseMyGold(goldAmountHolder)
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
      const finalPrizeIndex = Math.floor(normalizedAngle / 36) -1;
      if (finalPrizeIndex == 4) {
        goldAmountHolder = {
          goldAmount: 40
        }
        apiIncreaseMyGold(goldAmountHolder).then(res => {
          console.log("resp mesg:  ", res)
        });
      }
      if (finalPrizeIndex == 6) {
        goldAmountHolder = {
          goldAmount: 100
        }
        apiIncreaseMyGold(goldAmountHolder).then(res => {
          console.log("resp mesg:  ", res)
        });
      }
      // 动画结束后重置状态
      setTimeout(() => {
        this.isSpinning = false;
        this.selectedPrize = this.prizes[finalPrizeIndex];
        apiGetMyGold().then(res => {
          this.$store.commit('SET_COINS', res.data.obj);
        });
      }, 10000);
      setTimeout(() => {
        this.dialogVisible = true;
      }, 11000);

      // Show the tip
      this.showTip = true;
      setTimeout(() => {
        this.showTip = false;
      }, 4000);
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
  margin-bottom: 120px;
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
  white-space: nowrap;
}

.prize-content img {
  margin-top: 10px;
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

.cost-tip {
  position: fixed;
  font-size: 26px;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  z-index: 100;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.chalkboard {
  width: 80%;
  margin: 0 auto;
  padding: 15px;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  position: relative;
  bottom: 0;
}

.chalkboard p {
  color: white;
  text-align: center;
  font-size: 18px;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.chalkboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.05);
  pointer-events: none;
}

</style>