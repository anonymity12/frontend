<template>
  <div id="app">
    <!-- see https://element.eleme.cn/#/zh-CN/component/layout#row-attributes -->
    <el-row type="flex" align="bottom" justify="start">
      <el-col :span="6">
        <el-avatar :src="userHeadUrl" :size="150" shape="square" style="float: left;" ></el-avatar>
      </el-col>
        
      <el-col :span="3" >
        <p style="position: relative; left: 20px;  ">{{ username }}</p>
        <p style="position: relative; left: 20px;  ">{{ userIntro }}</p>
        <el-button @click="handleBox" style="position: relative; left: 20px; bottom: 0px; float: left">查看百宝箱</el-button>
      </el-col>
    </el-row>

    <hr>
    <ButterFlyInfo></ButterFlyInfo>
    <Baibao :boxShow="boxShow"></Baibao>
  </div>
</template>


<script>
import ButterFlyInfo from './ButterFlyInfo'
import Baibao from './Baibao'
export default {
  name: 'app',
  data() {
    return {
      userHeadUrl: 'https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-11-23-13-28-38README.png',
      boxShow: {
        show: false
      },
      username: "玥玥3号",
      userIntro: "我是一个樱花玫瑰仔的分身",
    }
  },
  methods: {
    startHacking() {
      this.$notify({
        title: '打开百宝箱ing',
        type: 'success',
        message: '请等待',
        duration: 5000
      })
      this.boxShow.show = true 
    },
    handleBox() {
      this.boxShow.show = true 
    }
  },
  components: {
    ButterFlyInfo,
    Baibao
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
