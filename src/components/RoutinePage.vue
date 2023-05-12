<template>
    <div>
        <el-menu
            mode="horizontal"
            background-color="white"
            text-color="#222"
            active-text-color="red"
            >
            <el-menu-item>
                <a style="font-size: xx-large;" href="#/home">⬅️</a>
            </el-menu-item>
            <span style="position: absolute; 
                            padding-top: 20px; 
                            right: 43%; 
                            font-size: 20px; 
                            font-weight: bold;"
                            >
                每日例行事务
            </span>
        </el-menu>
        <el-row>
            <div>
                <el-form :inline="true">
                    <el-form-item style="float: left">
                        <el-button type="primary" size="large" 
                            icon="el-icon-edit-outline"
                            @click="handleAdd()">
                            添加新的小事
                        </el-button>
                    </el-form-item>
                    <el-form-item style="float: center">
                        <el-button type="primary" size="large" 
                            @click="handleSandClick()">
                            聚沙成塔
                        </el-button>
                    </el-form-item>
                    <el-form-item style="float: right">
                        <el-button type="primary" size="large" 
                            @click="handleStepClick()">
                            逐步改善
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
        <div class="table">
            <el-table :data="routineData" border style="width: 100%">
                <el-table-column label="我有一件小事是" align="center" width="100%">
                    <template slot-scope="scope">
                        <span>{{ scope.row.detail }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)" >更新</el-button>
                        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>
        <!-- ensure updatingRoutine can be update by this dialog -->
        <RoutineEditDialog :dialogEdit="dialogEdit" :routineTobeEdit="updatingRoutine" ></RoutineEditDialog>
    </div>
</template>

<script>

import { apiQueryAllRoutineOfMine } from "../api/routine"
import { apiAddRoutine } from "../api/routine";
import { apiDeleteRoutine } from "../api/routine";
import { apiUpdateRoutine } from "../api/routine";

import RoutineEditDialog from '.RoutineEditDialog'
import RoutineAddDialog from '.RoutineAddDialog'
/*
routineObj:
    routineTitle
    routineId
    routineOwner
*/

export default({
    name: 'RoutinePage',
    data() {
        return {
            routineData: [],
            newRoutine: '',// just title, user info will generate in backend
            updatingRoutine: {},
            dialogEdit: {
                show: false 
            },
        }
    },
    methods: {
        handleAdd() {
            apiAddRoutine(this.newRoutine)
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.$message({
                            type: 'info',
                            message: '添加新惯例成功😊'
                        })
                    } else {
                        console.log(resp)
                        this.$message({
                            type: 'warning',
                            message: '添加失败，错误是：' + resp.data.msg
                        })

                    }
                })
        },
        handleDelete(index, row) {
            apiDeleteRoutine(`${row.routineId}`)
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.$message({
                            type: 'info',
                            message: resp.data.msg
                        })
                    } else {
                        console.log(resp)
                        this.$message({
                            type: 'warning',
                            message: resp.data.msg
                        })
                    }
                })
            apiQueryAllRoutineOfMine()
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.routineData = resp.data.obj
                    }
                })
        },
        handleUpdate(index, row) {
            // todo 2023-04-29 22:46:59 transfer old routine data between dialog and page
            this.updatingRoutine = {
                routineId: `${row.routineId}`,
                routineTitle: `${row.routineTitle}`
            }
            // showUpdateRoutineDialog(`${row.routineId}`, `${row.routineTitle}`)
            this.dialogEdit.show = true 
            apiUpdateRoutine(updatingRoutine)
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
                    } else {
                        this.$message({
                            type: 'warning',
                            message: resp.data.msg
                        })
                    }
                })
            apiQueryAllRoutineOfMine()
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.routineData = resp.data.obj
                    }
                })
        },
        handleSandClick() {},
        handleStepClick() {}
    },
    created() {
        apiQueryAllRoutineOfMine()
            .then(resp => {
                if (resp && resp.status === 200) {
                    this.routineData = resp.data.obj
                }
            })
    },
    components: {}
})
</script>
