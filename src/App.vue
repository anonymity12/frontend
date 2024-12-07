<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'MaShanZheng-Regular';
  src: url('./assets/MaShanZheng-Regular.ttf') format('truetype');
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FFF1CB;
}
.class1{
  background: #444;
  color: #eee;
}
.el-message__content {
  font-size: 28px; /* 设置您想要的字体大小 */
}

</style>
