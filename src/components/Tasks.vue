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
                <textarea cols="30" rows="5" @keyup.enter="addTask" 
                    style="text-shadow: gray 4px 4px 6px; font-size: large;" v-model="newTask"
                    placeholder="有什么事要搞定？回车确定要做这件事"></textarea>
            </el-row>
            <el-row type="flex" v-for="(task, index) in tasks" :key='index'>
                <!-- when u are just view a item, not editing -->
                <div v-if="task.edit == false" class="div-inline">
                    <label style="text-shadow: gray 6px 6px 4px;" @dblclick="task.edit = true" :class="{ 'done': task.status }">
                        <input type="checkbox" aria-label="Checkbox for following text input"
                            @click="task.status = !task.status" :checked="task.status">
                        {{ task.taskItem }}
                    </label>
                    <div class="action float-right div-inline">
                        <button type="button" @click="removeTask(index)">
                            X
                        </button>
                    </div>
                </div>
                <!-- when u are editing  -->
                <input v-else type="text" v-model="task.taskItem" placeholder="Edit Task" @focusout="task.edit = false"
                    @keyup.enter="task.edit = false">
            </el-row>
        </el-card>
    </div>
</template>

<script>
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
                this.newTask = ''
            }
        },
        removeTask: function () {
            if (confirm('不做这件事了？')) {
                this.tasks.splice(index, 1)
            }
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
</style>