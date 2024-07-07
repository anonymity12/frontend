<template>
  <body id="register-page">
    <el-form class="register-container" label-position="left">
      <h3 class="login_title">加入🦋乖娃娃App</h3>
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
      <el-form-item label="出生日期">
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
          v-model="registerForm.inviteCode"
          auto-complete="off"
          placeholder="邀请码,找天天要"
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
        birthday: new Date(),
        inviteCode: "",
      },
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() > Date.now();
        },
        shortcuts: [{
            text: '10年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 10 * 365 * 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
        }, {
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
        }, {
          text: '40年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 40 * 365 * 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
        }, {
          text: '50年前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 50 * 365 * 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
        },]
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
        inviteCode: this.registerForm.inviteCode,
      }).then((resp) => {
        console.log("register resp", resp)
        let statusCode = resp.data.status
        if(statusCode == 200){
          this.$router.replace({path: 'login'})
        } else if (statusCode == 500) {
          this.$message({
            type: "danger",
            message: resp.data.msg,
            offset: window.screen.height / 2,
            duration: 6000
          })
        }
      });
    },
  },
};
</script>

<style scoped>
#register-page {
  background: url("https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-02-06-13-17-14.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 60%;
  padding: 35px 35px 15px 35px;
  background: #FFF1CB;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

