<template>
  <div>
    <el-dialog title="家长模式验证" :visible.sync="dialogParent.show">
      <el-form :model="formData" ref="formPass" :rules="formrules" v-loading="loading">
        <el-form-item label="密码" prop="parent_passwd">
          <el-input v-model="formData.parent_passwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogParent.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogParentValid()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validParent } from '@/api/user'
export default {
  name: "edit",
  props: {
    dialogParent: Object
  },
  data() {
    return {
      formData: {
        parent_passwd: "",
      },
      formrules: {
        passOfParent: [
          { require: true, message: "请输入正确的家长密码", trigger: "blur" }
        ]
      },
      loading: false
    };
  },
  methods: {
    dialogParentValid() {
       this.$refs['formPass'].validate(valid => {
        if (valid) {
            this.loading = true
            // 2022-12-10 15:40:38 看来混合使用 _this, this 是可以的
            validParent(this.formData).then(res => {
                this.loading = false
                console.log("res is: ", res)
                // res.status 不是我们需要的，res.data里面返回的 才是一一对应 RespBean 的
                if (res.data.status == 200) {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  })
                  this.dialogParent.show = false 
                  this.$emit("validOk")
                }
                else {
                  this.$alert('家长身份 验证失败!', '错误密码')
                }
            })
            this.formData = {}
        } else {
            console.log("not valid input")
            return false
        }
       })
    }
  }
};
</script>

<style scoped></style>
