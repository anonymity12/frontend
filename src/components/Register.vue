<template>
  <body id="login-page">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">加入🦋元宇宙</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="registerForm.name"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="registerForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
        v-model="registerForm.birthday"
        align="right"
        type="date"
        placeholder="选择出生日期"
        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          type="text"
          v-model="registerForm.userface"
          auto-complete="off"
          placeholder="头像，现在手动吧"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; border: none"
          @click="register"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import { userRegister } from "@/api/user";
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        name: "",
        password: "",
        birthday: new Date()
      },
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        shortcuts: [{
            text: '20年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 20 * 365 * 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
        }, {
            text: '30年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 30 * 365 * 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
        }]
      }
    };
  },
  methods: {
    register() {
      var _this = this;
      userRegister({
        name: this.registerForm.name,
        password: this.registerForm.password,
        birthday: this.registerForm.birthday,
      }).then((resp) => {
        console.log("register ok", resp)
        let code=resp.data.code;
        if(code===200){
          this.$router.replace({path: '/login'})
        }
      });
    },
  },
};
</script>

<style scoped>
#login-page {
  background: url("../assets/img/bg.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
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
</style>

