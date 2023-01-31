<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float: left; font-family: '楷体GB_2312';
                    font-size: x-large;
                    text-shadow: gray 6px 6px 4px;
                    font-weight: bold;">解决事情，获得蝴蝶</span>

            </div>
            <el-row type="flex" class="width: 100%;">
                <textarea cols="50" rows="5" @keyup.enter="addTask" 
                    style="text-shadow: gray 4px 4px 6px; font-size: large; margin-bottom: 15px;" v-model="newTask"
                    placeholder="有什么事要搞定？回车确定要做这件事"></textarea>
            </el-row>
            <el-row type="flex" v-for="(task, index) in tasks" :key='index'>
                <!-- when u are just view a item, not editing -->
                <label style="text-shadow: rgba(168, 123, 151, 0.582) 6px 6px 4px; font-size: large;" @dblclick="task.edit = true" :class="{ 'done': task.status }">
                    <input type="checkbox" aria-label="Checkbox for following text input"
                        @click="onCheckBoxClicked" :checked="task.status">
                    {{ task.taskItem }} 
                </label>
                
                <button type="button" class="cancel-task" @click="removeTask(index)">
                    X
                </button>
                
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { apiAddTask } from '@/api/user'
import { apiCancelTask } from '@/api/user'
import { apiDoneTask } from '@/api/user'
export default {
    name: 'Tasks',
    props: {
        'taskTitle': String,
    },
    data() {
        return {
            tasks: [],
            newTask: ''
        }
    },
    mounted() {
        if (localStorage.getItem('matrix2')) {
            this.tasks = JSON.parse(localStorage.getItem('matrix2')).tasks
        }
    },
    watch: {
        tasks: {
            handler() {
                localStorage.setItem('matrix2', JSON.stringify({
                    tasks: this.tasks
                }));
            },
            deep: true
        }
    },
    methods: {
        addTask: function () {
            if (this.newTask !== '') {

                this.tasks.push({
                    taskItem: this.newTask,
                    edit: false,
                    status: false
                })
                apiAddTask(this.newTask)
                this.newTask = ''
            }
        },
        removeTask: function () {
            if (confirm('不做这件事了？')) {
                apiRemoveTask(index)
                this.tasks.splice(index, 1)
            }
        },
        onCheckBoxClicked: function() {
            task.status = !task.status
        }
    }
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
    margin: 30px;
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
.cancel-task{
    background: #d10c0c89;
    margin-left: 10px;
    padding: 2px;
}
</style>