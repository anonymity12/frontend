<template>
  <div>
    <el-dialog title="家长模式验证" :visible.sync="dialogParent.show">
      <el-form :model="formData" ref="formPass" :rules="formrules">
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
      }
    };
  },
  methods: {
    dialogParentValid() {
        /*
        post request to backend(password):
			if return ok:
				parent_flag = true

			else:// return invalid passwd:
        */
       this.$refs[formPass].validate(valid => {
        if (valid) {
            var valid_pass_url = "http://101.43.166.211:8081/users/validParent"
            this.$axios.post(valid_pass_url, formData).then(res => {
                this.$message({
                    type: "success",
                    message: "通过家长验证！"
                })
                this.dialogParent.show = false 
                this.$emit("validOk")
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
