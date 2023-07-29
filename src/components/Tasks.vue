<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: left;font-size: large;
                    font-weight: bold;">
                    任务面板
                </span>
            </div>
            <el-row type="flex" style="width: 100%;" class="row-container">
                <el-select v-model="matrixSelection" placeholder="请选择任务象限">
                    <el-option v-for="item in matrixOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <textarea cols="50" rows="5" @keyup.enter="addTask"
                    style="text-shadow: gray 4px 4px 6px; font-size: large; margin-bottom: 15px;" v-model="newTaskTitle"
                    placeholder="不断的小成功，是大成功的催化剂。有什么事要搞定？"></textarea>
                
            </el-row>
        </el-card>
        <task-matrix></task-matrix>
    </div>
</template>

<script>
import TaskMatrix from './TaskMatrix.vue'
import { apiAddTask } from '@/api/user'
import { apiCancelTask } from '@/api/user'
import { apiDoneTask } from '@/api/user'
import { apiGetTasks } from '@/api/user'
export default {
    name: "Tasks",
    props: {
        "taskTitle": String,
    },
    data() {
        return {
            tasks: [],
            newTaskTitle: "",
            cancelBoxShow: false,
            currentCancelRow: {},
            tasksShow: false,
            toggleArrow: "▼",
            matrixOptions: [
                {
                    value: '第二象限',
                    label: '重要不紧急'
                },
                {
                    value: '第一象限',
                    label: '重要且紧急'
                },
                {
                    value: '第三象限',
                    label: '紧急不重要'
                },
                {
                    value: '第四象限',
                    label: '不紧急不重要'
                }
            ],
            matrixSelection: ''
        };
    },
    mounted() {
        this.getAllTasks();
    },
    watch: {
        tasks: {
            handler() {
                localStorage.setItem("matrix2", JSON.stringify({
                    tasks: this.tasks
                }));
            },
            deep: true
        }
    },
    methods: {
        getAllTasks: function () {
            apiGetTasks().then(res => {
                console.log("get all tasks: ", res);
                var apiReady = true;
                if (apiReady) {
                    this.tasks = res.data;
                }
                else {
                    console.log("api not ready");
                }
            });
        },
        addTask: function () {
            var title = this.newTaskTitle && this.newTaskTitle.trim();
            if (title !== "") {
                console.log("front: title: ", title);
                apiAddTask(title).then(res => {
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
        cancelTask: function (row) {
            this.cancelBoxShow = true;
            this.currentCancelRow = row;
        },
        dialogCancelConfirm: function () {
            apiCancelTask(this.currentCancelRow.id).then(res => {
                if (res.data.status == 200) {
                    this.cancelBoxShow = false;
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    this.currentCancelRow.status = 0;
                }
            });
        },
        onCheckBoxClicked: function (row) {
            console.log("box clicked for row:", row);
            if (row.status == 1) {
                var taskDto = {
                    status: 2,
                    id: row.id
                };
                apiDoneTask(taskDto).then(res => {
                    if (res.data.status == 200) {
                        this.$message({
                            type: "info",
                            message: "任务已完成✅"
                        });
                        row.status = 2;
                    }
                    else {
                        this.$message({
                            type: "warning",
                            message: "后端错误"
                        });
                    }
                });
            }
            else if (row.status == 2) {
                var taskDto = {
                    status: 1,
                    id: row.id
                };
                apiDoneTask(taskDto).then(res => {
                    if (res.data.status == 200) {
                        this.$message({
                            type: "info",
                            message: "任务没完成❌"
                        });
                        row.status = 1;
                    }
                    else {
                        this.$message({
                            type: "warning",
                            message: "后端错误"
                        });
                    }
                });
            }
        },
        showTasksToggle: function () {
            this.tasksShow = !this.tasksShow;
            if (this.tasksShow) {
                this.toggleArrow = "▲";
            }
            else {
                this.toggleArrow = "▼";
            }
        }
    },
    components: { TaskMatrix }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    margin-top: 8px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.list-group-item>div {
    border: 0;
}

.task.list-group-item div {
    background: #00000045;
}

.card-body {

    overflow: hidden;
    overflow-y: auto;
}

.done {
    text-decoration: line-through;
}

.bg-warning label {
    color: #fff !important
}

.div-inline {
    display: inline-block;
}

.cancel-task {
    background: #d10c0c89;
    margin-left: 10px;
    padding: 2px;
}

.checkboxThree {
    width: 45px;
    height: 24px;
    background: #333;
    margin: 5px 15px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}

.checkboxThree:before {
    content: 'OK';
    position: absolute;
    top: 2px;
    left: 3px;
    height: 2px;
    color: #26ca28;
    font-size: 12px;
    font-weight: bolder;

}

.checkboxThree:after {
    content: 'No';
    position: absolute;
    top: 2px;
    left: 25px;
    height: 2px;
    color: #ddd;
    font-size: 12px;
    font-weight: bolder;
}

.checkboxThree label {
    display: block;
    width: 20px;
    height: 18px;
    border-radius: 5px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    -ms-transition: all .5s ease;
    transition: all .5s ease;
    cursor: pointer;
    position: absolute;
    top: 3px;
    z-index: 1;
    left: 2px;
    background: #cec3a1;
}

input[type=checkbox] {
    visibility: hidden;
}

.checkboxThree input[type=checkbox]:checked+label {
    left: 23px;
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
    left: -10px;
    right: -10px;
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
