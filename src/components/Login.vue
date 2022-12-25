<template>
<body id="login-page">

      <el-form
        :rules="rules"
        :model="loginForm"
        ref="formlogin"
        class="login-container"
        label-position="left"
        v-loading="loading"
      >
        <h3 class="login_title">欢迎你进入蝴蝶谷</h3>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            placeholder="身份（小鼹鼠）"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="令牌（芝麻开门）"
          ></el-input>
        </el-form-item>
        <el-checkbox
          class="login_remember"
          v-model="checked"
          label-position="left"
          >记住我</el-checkbox
        >
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            @click.native.prevent="submitClick"
            style="width: 100%"
            >开门进家</el-button
          >
        </el-form-item>
      </el-form>
</body>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "yy",
        password: "666"
      },
      rules: {
        username: [
          { required: true, message: "用户名必须选择", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true,
      loading: false
    };
  },
  methods: {
    submitClick: function() {
      var _this = this;
      this.loading = true;
      // tt 这个 /login 请求 会被 WebSecurityConfig 自动处理，不是程序员我处理
      // tt 这个请求，如果放在 postman 里面就是：post : http://101.43.166.211:8081/login?username=lkj&password=232323
      var loginUrl = "http://101.43.166.211:8081/doLogin";
      this.$axios.post(loginUrl, this.loginForm)
        .then(resp => {
          this.loading = false 
          console.log(resp)
          if (resp.data.status == 200) {
            var msg = resp.data.msg
            this.$message(msg)
            var _path = "/" + this.loginForm.username
            this.$router.push({path: '/guoguo'})
          } else {
            this.$message({
              type: "warning",
              message: "后端无法识别您的请求"
            })
          }

        })

    
    }
  }
};
</script>
<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
#login-page {
  background: url("https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-02-04-17-37-11img_repo.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
</style>
