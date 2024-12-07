<template>
  <body id="login-page">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">进入乖娃娃宝岛</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.loginName"
          auto-complete="off"
          placeholder="你的名字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="进岛口令"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; border: none"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="danger"
          style="width: 100%; border: none;margin-top: 10px;"
          @click="toRegister"
          >没有账号？去注册</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import { userLogin } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "",
        password: "",
      },
      responseResult: [],
    };
  },
  methods: {
    login() {
      var _this = this;
      userLogin({
        loginName: this.loginForm.loginName,
        password: this.loginForm.password,
      }).then((resp) => {
        console.log("login ok", resp)
        let status =resp.data.status;
        if(status===200){
          let obj = resp.data.obj;
          let token = obj.token;
          let user = obj.user;
          //存储token
          _this.$store.commit('SET_TOKENN', token);
          //存储user，优雅一点的做法是token和user分开获取
          _this.$store.commit('SET_USER', user);
          console.log("current user token: ", _this.$store.state.token);
          var path = this.$route.query.redirect
          this.$router.replace({path: path === '/' || path === undefined ? '/' : path})
        } else {
          this.$message({
            type: "danger",
            message: "账号或密码错误",
            offset: window.screen.height / 2,
            duration: 4000
          })
          
        }
      }, (reason) => {
        this.$message({
          type: "warning",
          message: "服务器错误，请联系天天",
          offset: window.screen.height / 3,
          duration: 4000,
        })
      });
    },
    toRegister() {
      this.$router.replace({path: '/register'})
    }
  },
};
</script>

<style scoped>
#login-page {
  background: url("https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-06-13-17-14.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}
body {
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  width: 50%;
  background: #FFF1CB;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  box-shadow: 5px 5px 5px #fac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

