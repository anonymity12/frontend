<template>
  <!-- this is yueyue's good child page, also the first good child in our world, 
  later u can copy this page, for more good children! -->
  <div id="app">
    <el-row type="flex" align="bottom" justify="start">
      <el-col :span="12">
        <el-avatar :src="user.userface" :size="150"  style="float: left;" ></el-avatar>
      </el-col>
        
      <el-col :span="12" >
        <p  >{{ user.cname }}</p>
        <p  >{{ user.intro }}</p>
        <el-button @click="handleBox" style="float: left">查看百宝箱</el-button>
      </el-col>
    </el-row>

    <hr>
    <ButterFlyInfo :fly-owner="pageOwner"></ButterFlyInfo>
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
      pageOwner: 'yy',
      boxShow: {
        show: false
      },
      user: {
        birthday: '',
        name: '',
        cname: '',
        intro: '',
        userface: '',
        address: '',
        phone: '',
      },
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
    },
    getOwnerInfo() {
      var _userInfoUrl = 'http://101.43.166.211:8081/users/' + this.pageOwner + '/getInfo'
      this.$axios.get(_userInfoUrl).then(res => {
        console.log("request for user info from: " + _userInfoUrl)
        this.user = res.data
      })
    }
  },
  created() {
    this.getOwnerInfo()
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
