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
                        <span>{{ scope.row.routineContent }}</span>
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
        <RoutineEditDialog :routineEditDialog="dialogEdit" :routineToBeEdit="updatingRoutine" @updateOk="refreshRoutineList"></RoutineEditDialog>
        <RoutineAddDialog :routineAddDialog="dialogAdd" @addOk="refreshRoutineList"></RoutineAddDialog>
    </div>
</template>

<script>

import { apiQueryAllRoutineOfMine } from "../api/routine"
import { apiDeleteRoutine } from "../api/routine"
import RoutineEditDialog from './RoutineEditDialog'
import RoutineAddDialog from "./RoutineAddDialog"
/*
routineObj:
    routineContent
    routineId
    routineOwner
*/

export default({
    name: 'RoutinePage',
    data() {
        return {
            routineData: [],
            newRoutine: '',// just title, user info will generate in backend
            updatingRoutine: {
                routineId:0,
                routineContent: ''
            },
            dialogEdit: {
                show: false 
            },
            dialogAdd: {
                show: false
            },
        }
    },
    methods: {
        handleDelete(index, row) {
            var deleteId = `${row.routineId}`
            apiDeleteRoutine(deleteId)
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.$message({
                            type: 'success',
                            message: resp.data.msg
                        })
                        apiQueryAllRoutineOfMine()
                            .then(resp => {
                                if (resp && resp.status === 200) {
                                    this.routineData = resp.data
                                }
                            })
                    } else {
                        console.log(resp)
                        this.$message({
                            type: 'warning',
                            message: resp.data.msg
                        })
                    }
                })
            
        },
        handleAdd() {
            this.dialogAdd.show = true
        },
        handleUpdate(index, row) {
            // transfer routine data from page to dialog
            // console.log("bef: update routine: ", this.updatingRoutine)
            this.updatingRoutine = {
                routineId: `${row.routineId}`,
                routineContent: `${row.routineContent}`
            }
            // console.log("update routine: ", this.updatingRoutine)
            this.dialogEdit.show = true 
        },
        refreshRoutineList() {
            apiQueryAllRoutineOfMine()
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.routineData = resp.data
                    }
                })
        },
        handleSandClick() {},
        handleStepClick() {}
    },
    created() {
        apiQueryAllRoutineOfMine()
            .then(resp => {
                console.log("routine all:" , resp)
                if (resp && resp.status === 200) {
                    this.routineData = resp.data
                }
            })
    },
    components: { RoutineAddDialog, RoutineEditDialog }
})
</script>
