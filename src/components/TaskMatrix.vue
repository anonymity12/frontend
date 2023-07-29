<template>
    <div>
        <!-- 第一行，两列 -->
        <el-row>
            <el-col :span="12">
                <div class="quadrant">
                    <div class="quadrant-content">
                        <el-table :data="tasks" height="100%">
                            <el-table-column label="重要但不紧急" align="left">
                                <template slot-scope="scope">
                                    <div style="text-shadow: rgba(168, 123, 151, 0.582) 6px 6px 4px;"
                                        :class="{ 'done': scope.row.status == 2 }">
                                        <div class="checkboxThree" style="display: inline-block;">
                                            <input type="checkbox" :disabled="scope.row.status == 0"
                                                :id="'row' + scope.row.id" :checked="scope.row.status == 2" />
                                            <label :for="'row' + scope.row.id" class="larger-click-area"
                                                @click="onCheckBoxClicked(scope.row)"></label>
                                        </div>
                                        {{ scope.row.title }}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="quadrant">
                    <h2>重要且紧急</h2>
                </div>
            </el-col>
        </el-row>

        <!-- 第二行，两列 -->
        <el-row>
            <el-col :span="12">
                <div class="quadrant">
                    <h2>不重要且紧急</h2>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="quadrant">
                    <h2>不重要且不紧急</h2>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { apiAddTask } from '@/api/user'
import { apiCancelTask } from '@/api/user'
import { apiDoneTask } from '@/api/user'
import { apiGetTasks } from '@/api/user'
export default {
    name: 'TaskMatrix',
    data() {
        return {
            tasks: [],
            tasksShow: false,
            toggleArrow: "▼"
        }
    },
    mounted() {
        this.getAllTasks()
    },
    methods: {
        getAllTasks: function () {
            apiGetTasks().then(res => {
                console.log("get all tasks: ", res)
                var apiReady = true;
                if (apiReady) {
                    this.tasks = res.data
                } else {
                    console.log("api not ready")
                }
            })
        },
        onCheckBoxClicked: function (row) {
            console.log("box clicked for row:", row)
            if (row.status == 1) {
                var taskDto = {
                    status: 2,
                    id: row.id
                }
                apiDoneTask(taskDto).then(res => {
                    if (res.data.status == 200) {
                        this.$message({
                            type: 'info',
                            message: "任务已完成✅"
                        })
                        row.status = 2
                    } else {
                        this.$message({
                            type: 'warning',
                            message: "后端错误"
                        })
                    }
                })
            } else if (row.status == 2) {
                var taskDto = {
                    status: 1,
                    id: row.id
                }
                apiDoneTask(taskDto).then(res => {
                    if (res.data.status == 200) {
                        this.$message({
                            type: 'info',
                            message: "任务没完成❌"
                        })
                        row.status = 1
                    }
                    else {
                        this.$message({
                            type: 'warning',
                            message: "后端错误"
                        })
                    }
                })
            }
        },
    }
};
</script>

<style>
.quadrant {
    border: 1px solid #ccc;
    padding: 2px;
    height: 200px;
    box-sizing: border-box;
}

.quadrant-content {
    height: 100%;
    overflow-y: auto;
    /* 设置溢出部分可滚动 */
}

.checkboxThree {
    width: 30px;
    height: 16px;
    background: #333;
    margin: 5px 5px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}

.checkboxThree:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    height: 2px;
    color: #26ca28;
    font-size: 12px;
    font-weight: bolder;

}

.checkboxThree:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 25px;
    height: 2px;
    color: #ddd;
    font-size: 12px;
    font-weight: bolder;
}

.checkboxThree label {
    display: block;
    width: 13px;
    height: 12px;
    border-radius: 2px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    -ms-transition: all .5s ease;
    transition: all .5s ease;
    cursor: pointer;
    position: absolute;
    top: 2px;
    z-index: 1;
    left: 2px;
    background: #cec3a1;
}

input[type=checkbox] {
    visibility: hidden;
}

.checkboxThree input[type=checkbox]:checked+label {
    left: 15px;
    background: #00ff51;
}

.toggleButton {
    float: left;
    margin: 3px;
}

.larger-click-area::before {
    content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -30px;
    right: -10px;
}
.larger-click-area::after {
    content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -30px;
}
</style>