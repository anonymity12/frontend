<template>
  <div class="container">
    <!-- 答案之书卡片 -->
    <div class="card">
      <div class="icon-wrapper">
        <img src="@/assets/book.png" alt="答案之书" class="icon">
      </div>
      <div class="title">答案之书</div>
    </div>

    <!-- 旋转轮卡片 -->
    <div class="card">
      <div class="icon-wrapper">
        <img src="@/assets/wheel.png" alt="旋转轮" class="icon">
      </div>
      <div class="title">旋转轮</div>
    </div>

    <!-- 掷硬币卡片 -->
    <div class="card">
      <div class="icon-wrapper">
        <img src="@/assets/coin.png" alt="掷硬币" class="icon">
      </div>
      <div class="title">掷硬币</div>
    </div>
  </div>
</template>

<script>
// 组件逻辑可以在这里添加
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #1a1a1a;
  min-height: 100vh;
}

.card {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-wrapper {
  margin-bottom: 10px;
}

.icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.title {
  color: white;
  font-size: 16px;
}
</style>