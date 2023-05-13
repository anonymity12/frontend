
<template>
    <div>
        <el-dialog title="修改惯例" :visible.sync="routineEditDialog.show"
            width="100%">
            <el-form
                :model="routineTobeEdit"
                ref="formNewRoutine"
                label-width="100px"
                :rules="formNewRoutineRules">
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
                <el-button type='info' @click="routineAddDialog.show=false">取 消</el-button>
                <el-button type="primary" @click="confirmUpdateRoutine()" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
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
                    // todo 2023-05-13 22:12:11
                    // 1、construct routine obj
                    // 2、send new routine obj to api-end-point
                }  else {
                    this.$message("表单校验不通过")
                    return false
                }
            })
        }
    }
}
</script>