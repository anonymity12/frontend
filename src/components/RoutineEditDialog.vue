
<template>
    <div>
        <el-dialog title="修改惯例" :visible.sync="routineEditDialog.show"
            width="100%">
            <el-form
                :model="routineTobeEdit"
                ref="formNewRoutine"
                label-width="100px"
                :rules="formRoutineRules">
                <el-form-item
                    label="惯例内容："
                    prop="routineContent">
                    <el-input
                        v-model="routineToBeEdit.routineContent">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="惯例ID"
                    prop="routineId">
                    <el-input 
                        v-model="routineToBeEdit.routineId"
                        :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="惯例Owner"
                    prop="routineOwner">
                    <el-input 
                        v-model="routineToBeEdit.routineOwner"
                        :disabled="true">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type='info' @click="routineEditDialog.show=false">取 消</el-button>
                <el-button type="primary" @click="confirmUpdateRoutine()" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { apiUpdateRoutine } from '@api/routine.js'
export default {
    name: "RoutineEditDialog",
    props: {
        routineEditDialog: Object,
        routineTobeEdit: Object
    },
    methods: {
        confirmUpdateRoutine() {
            this.$refs["formNewRoutine"].validate(valid=>{
                if (valid) {
                    console.log("ready to update routine: ", routineTobeEdit)
                    apiUpdateRoutine(routineTobeEdit)
                        .then(resp => {
                            if (resp.status != 200) {
                                this.$message({
                                    type: 'warning',
                                    message: '服务器通信不畅'
                                })
                            }
                            else if (resp.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: resp.data.msg
                                })
                                this.routineEditDialog.show = false
                                this.$emit("updateOk")
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: resp.data.msg
                                })
                            }
                        })
                }  else {
                    this.$message("表单校验不通过")
                    return false
                }
            })
        }
    },
    data() {
        return {
            formRoutineRules: {
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
}
</script>