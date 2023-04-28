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
    </div>
</template>

<script>

import { apiQueryAllRoutineOfMine } from "../api/routine"
import { apiAddRoutine } from "../api/routine";
import { apiDeleteRoutine } from "../api/routine";
import { apiUpdateRoutine } from "../api/routine";

export default({
    name: 'RoutinePage',
    data() {
        return {
            routineData: [],
        }
    },
    methods: {
        handleAdd() {},
        handleDelete() {},
        handleUpdate() {},
        handleSandClick() {},
        handleStepClick() {}
    },
    created() {
        apiQueryAllRoutineOfMine()
    },
    components: {}
})
</script>
