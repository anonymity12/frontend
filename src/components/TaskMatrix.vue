<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: left;font-size: large;
                    font-weight: bold;">
                    任务面板
                </span>
                <el-button @click="panelToggleClicked" style="float: right;font-size: large;
                    font-weight: bold;">🔥</el-button>
            </div>
            <el-row type="flex" style="width: 100%;" class="row-container">
                <el-select v-if="show4Panel" v-model="matrixSelection" placeholder="请选择任务象限">
                    <el-option v-for="item in matrixOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <textarea cols="50" rows="5" @keyup.enter="addTask"
                    style="text-shadow: gray 4px 4px 6px; font-size: large; margin-bottom: 15px;" v-model="newTaskTitle"
                    placeholder="不断的小成功，是大成功的催化剂。有什么事要搞定？"></textarea>
            </el-row>
        </el-card>

        <div v-if="show4Panel">
            <!-- 第一行，两列 -->
            <el-row>
                <el-col :span="12">
                    <div class="quadrant">
                        <div class="quadrant-content">
                            <el-table :data="m2tasks" height="100%">
                                <el-table-column label="充电蓄能" align="left">
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
                        <el-table :data="m1tasks" height="100%">
                            <el-table-column label="生活基础" align="left">
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
                </el-col>
            </el-row>
            <!-- 第二行，两列 -->
            <el-row>
                <el-col :span="12">
                    <div class="quadrant">
                        <el-table :data="m3tasks" height="100%">
                            <el-table-column label="创造产出" align="left">
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
                </el-col>
                <el-col :span="12">
                    <div class="quadrant">
                        <el-table :data="m4tasks" height="100%">
                            <el-table-column label="娱乐休整" align="left">
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
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <div class="quadrant">
                <el-table :data="m1tasks" height="100%">
                    <el-table-column label="生活基础" align="left">
                        <template slot-scope="scope">
                            <div style="text-shadow: rgba(168, 123, 151, 0.582) 6px 6px 4px;"
                                :class="{ 'done': scope.row.status == 2 }">
                                <div class="checkboxThree" style="display: inline-block;">
                                    <input type="checkbox" :disabled="scope.row.status == 0" :id="'row' + scope.row.id"
                                        :checked="scope.row.status == 2" />
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
    </div>
</template>
<script>
import { apiDoneTask } from '@/api/task'
import { apiGetTasks } from '@/api/task'
import { apiAddTask } from '@/api/task'

export default {
    name: 'TaskMatrix',
    data() {
        return {
            tasks: [],
            newTaskTitle: "",
            tasksShow: false,
            toggleArrow: "▼",
            matrixOptions: [
                {
                    value: '2',
                    label: '充电蓄能'
                },
                {
                    value: '1',
                    label: '生活基础'
                },
                {
                    value: '3',
                    label: '创造产出'
                },
                {
                    value: '4',
                    label: '娱乐休整'
                }
            ],
            matrixSelection: '1',
            show4Panel: false
        }
    },
    computed: {
        m1tasks: function () {
            return this.tasks.filter(task => task.matrix === 1)
        },
        m2tasks: function () {
            return this.tasks.filter(task => task.matrix === 2)
        },
        m3tasks: function () {
            return this.tasks.filter(task => task.matrix === 3)
        },
        m4tasks: function () {
            return this.tasks.filter(task => task.matrix === 4)
        }
    },
    mounted() {
        this.getAllTasks()
    },
    methods: {
        getAllTasks: function () {
            apiGetTasks().then(res => {
                this.tasks = res.data
            })
        },
        addTask: function () {
            var title = this.newTaskTitle && this.newTaskTitle.trim();
            if (title !== "") {
                apiAddTask(title, this.matrixSelection).then(res => {
                    console.log("ret res for add new task: ", res);
                    if (res.data.status == 200) {
                        this.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        apiGetTasks().then(res => {
                            this.tasks = res.data;
                        });
                        this.newTaskTitle = "";
                    }
                    else {
                        console.log("apiAddTask failed");
                    }
                });
            }
            else {
                this.$message({
                    type: "warning",
                    message: "任务不能空白"
                });
            }
            this.newTaskTitle = "";
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
            this.$emit('changeTaskStatusEvent', row.id)
        },
        panelToggleClicked: function () {
            this.show4Panel = !this.show4Panel
        }
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

@media screen and (max-width:768px) {
    .row-container {
        flex-direction: column;
    }
}

@media screen and (min-width: 769px) {
    .row-container {
        flex-direction: row;
    }
}
</style>