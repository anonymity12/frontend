<template>
    <div class="info">
        <h1>蝴蝶园管理</h1>
        <el-row>
            <el-col :span="20" :push='2'>
                <div>
                    <el-form :inline="true">
                        <el-form-item style="float: left" label="查询蝴蝶信息:">
                            <el-input v-model="keyUser" placeholder="哪一只蝴蝶呢"></el-input>
                        </el-form-item>
                        <el-form-item style="float: right">
                            <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="handleAdd()">添加蝴蝶🦋
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="table">
                    <el-table :data="searchFlyInfo(keyUser)" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="60">
                        </el-table-column>
                        <el-table-column label="蝴蝶名字" align="center" width="100">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="蝴蝶图案" align="center" width="100">
                            <template slot-scope="scope">
                                <img :src="scope.row.image" min-width="70" height="70">
                            </template>
                        </el-table-column>
                        <el-table-column label="日期" align="center" width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.date | moment }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="事件" align="center" width="200">
                            <template slot-scope="scope">
                                <span>{{ scope.row.evaluate }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <div>
            <p>谁的蝴蝶多，谁就是优秀的蝴蝶管理家</p>
            <img style="width: 100px; height:100px" src="https://picgorepo.oss-cn-beijing.aliyuncs.com/img_repo_2021-12-13-12-59-13.png"/>
            </div>
        <!-- tdo 2022-11-24 19:48:18: AddFly EditFly 2022-11-29 20:21:25 -->
        <AddFly :dialogAdd="dialogAdd" @update="getFlyInfo"></AddFly>
        <EditFly :dialogEdit="dialogEdit" :form="form" @updateEdit="getFlyInfo"></EditFly>
    </div>
</template>
<script>
import AddFly from './AddFly'
import EditFly from './EditFly'
export default {
    name: 'info',
    data() {
        return {
            img_url: 'https://picgorepo.oss-cn-beijing.aliyuncs.com/img_repo_2021-12-13-12-59-13.png',
            tableData: [],
            dialogEdit: {
                show: false,
            },
            dialogAdd: {
                show: false
            },
            keyUser: "",
            form: {    //编辑信息
                date: '',
                name: '',
                title: '',
                evaluate: '',
                image: '',
            },
        }
    },
    methods: {
        getFlyInfo() {
            this.$axios.get('http://101.43.166.211:8081/flies/getAll').then(res => {
                console.log(res)
                this.tableData = res.data
            })
        },
        handleAdd() {  //添加
            this.dialogAdd.show = true;
        },
        handleEdit(index, row) {  //编辑
            this.dialogEdit.show = true; //显示弹
            this.form = {
                date: row.date,
                name: row.name,
                image: row.image,
                evaluate: row.evaluate,
                id: row.id
            }
            console.log("row is" ,row)
        },
        handleDelete(index, row) {
            // 删除用户信息
            this.$axios.delete(`http://101.43.166.211:8081/data/${row.id}`).then(res => {
                this.$message({
                    type: "success",
                    message: "删除信息成功"
                })
                this.getFlyInfo()    //删除数据，更新视图
            })
        },
        searchFlyInfo(keyFly) {
            return this.tableData.filter((fly) => {
                if (fly.name.includes(keyFly)) {
                    return fly
                }
            })
        }
    },
    created() {
        this.getFlyInfo()
    },
    components: {
        AddFly,
        EditFly
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-size: 30px;
    color: #333;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 5px;
    border-bottom: 2px solid #409EFF;
    width: 300px
}
</style>