<template>
    <div>
        <el-dialog title="添加新的惯例" :visible.sync="routineAddDialog.show"
            width="100%">
            <el-form
                :model="routineFormData"
                ref="formNewRoutine"
                label-width="100px"
                :rules="formNewRoutineRules">
                <el-form-item
                    label="要每日做的事情是："
                    prop="routineContent">
                    <el-input
                        v-model="routineFormData.routineContent"
                        placeholder="输入你要做的事情">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type='info' @click="routineAddDialog.show=false">取 消</el-button>
                <el-button type="primary" @click="confirmAddRoutine('formNewRoutine')" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { apiAddRoutine } from '../api/routine.js'
export default {
    name: "RoutineAddDialog",
    props: {
        routineAddDialog: Object
    },
    data() {
        return {
            routineFormData: {
                routineContent: ""
            },
            formNewRoutineRules: {
                routineContent: [
                    {
                        required: true,
                        message: "惯例内容不能为空",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        confirmAddRoutine(formNewRoutine) {
            this.$refs[formNewRoutine].validate(valid=>{
                if (valid) {
                    var routineObject = {
                        routineContent: this.routineFormData.routineContent
                    }
                    apiAddRoutine(routineObject).then(resp=>{
                        if (resp.status === 200) {
                            this.$message({
                                type: 'info',
                                message: "添加惯例成功"
                            })
                            this.routineFormData.routineContent = ""
                            this.routineAddDialog.show = false 
                            this.$emit("addOk")
                        } else {
                            this.$message({
                                type: 'info',
                                message: "添加惯例失败，code:" + resp.status
                            })
                        }
                    })
                } else {
                    this.$message("表单校验不通过")
                    return false
                }
            })
        }
    }
}
</script>