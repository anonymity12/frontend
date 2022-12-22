<template>
    <div class="info">
        <div>
            <h3>我管理的蝴蝶园</h3>
            <p>园子里今天有 {{tableData.length}} 个蝴蝶</p>
            <div class="divbg">
                <br><br>
            </div>
        </div>
        
        <el-row>
            <el-col :span="20" :push='2'>
                <div>
                    <el-form :inline="true">
                        <el-form-item style="float: left">
                            <el-button type="danger" size="small" icon="el-icon-edit-outline" @click="handleParentMode()">{{parent_button_text}}
                            </el-button>
                        </el-form-item>
                        <el-form-item style="float: right">
                            <el-button type="primary" size="large" icon="el-icon-edit-outline" @click="handleAdd()">添加蝴蝶🦋
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="table">
                    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" 
                            :header-cell-style='tableHeaderStyle'
                            :row-style="rowStyle"
                            >
                        <el-table-column label="蝴蝶图案" align="center" width="100">
                            <template slot-scope="scope">
                                <img :src="scope.row.image" min-width="30" width="90" height="90">
                                <span>蝴蝶状态：{{ scope.row.status }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="蝴蝶来源" align="left" width="100">
                            <template slot-scope="scope">
                                <span>{{ scope.row.evaluate }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="蝴蝶名字" align="center" width="100">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="诞生时间" align="center" width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.date | moment }}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column type="index" label="序号" align="center" width="60">
                        </el-table-column> -->
                        
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleGrow(scope.$index, scope.row)" :disabled="!parent_flag">成年礼</el-button>
                                <el-button size="mini" type="danger" @click="handleRelease(scope.$index, scope.row)" :disabled="!parent_flag">放生它
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <div class="block" style="margin-top:15px;">
                        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handlePageChange" 
                        :current-page="currentPage" 
                        :page-sizes="[1,5,10,20]" 
                        :page-size="pageSize" 
                        layout="total, sizes, prev, pager, next, jumper" 
                        :total="tableData.length">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div>
            <p>谁的蝴蝶多，谁就是优秀的蝴蝶管理家!你现在的排名是：</p>
            <h2>{{myRank}}</h2>
            <img style="width: 100px; height:100px" src="https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-12-01-18-29-10README.png"/>
            <br/>
            <a href="/#/valley">进入秘密王国</a>
        </div>
        <!-- tdo 2022-11-24 19:48:18: AddFly EditFly 2022-11-29 20:21:25 -->
        <AddFly :dialogAdd="dialogAdd" :owner="flyOwner" @update="getFlyInfo"></AddFly>
        <EditFly :dialogEdit="dialogEdit" :form="form" @updateEdit="getFlyInfo"></EditFly>
        <ValidParent :dialogParent="dialogParent" @validOk="validSuccess"></ValidParent>
    </div>
</template>
<script>
import AddFly from './AddFly'
import EditFly from './EditFly'
import ValidParent from './ValidParent'
export default {
    name: 'info',
    props: ['flyOwner'],
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
            dialogParent: {
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
            myRank: '9',
            parent_flag: false, // false: now normal mode, true: now parent mode; default: false: normal mode
            parent_button_text: '进入家长模式',
            currentPage: 1,
            total: 100,
            pageSize: 5,
        }
    },
    watch: {
		parent_flag(new_parent_flag, old_parent_flag) {
			if (new_parent_flag == true) {
				// now parent in control
				this.parent_button_text = '退出家长模式'
			} else if (new_parent_flag == false) {
				// now exit parent mode, to normal mode
				this.parent_button_text = '进入家长模式'
			}
		}
	},
    methods: {
        getMyRank() {
            var rank_url = 'http://101.43.166.211:8081/ranks/' + this.flyOwner + '/getMyRank'
            this.$axios.get(rank_url).then(res => {
                console.log("my request url is", rank_url)
                console.log("get user rank now:::", res.data)
                this.myRank = res.data
            })
        },
        getFlyInfo() {
            var _url = 'http://101.43.166.211:8081/flies/' + this.flyOwner + '/getAll'
            this.$axios.get(_url).then(res => {
                console.log("flyInfo request url is: "+ _url)
                this.tableData = res.data
            })
        },
        validSuccess() {
            this.parent_flag = true
        },
        handleAdd() {  //添加
            this.dialogAdd.show = true;
        },
        handleGrow(index, row) {  //编辑
            this.$axios.post(`http://101.43.166.211:8081/flies/growStatus/${row.id}`)
        },
        handleRelease(index, row) {
            this.$axios.post(`http://101.43.166.211:8081/flies/releaseStatus/${row.id}`)
        },
        searchFlyInfo(keyFly) {
            return this.tableData.filter((fly) => {
                if (fly.name.includes(keyFly)) {
                    return fly
                }
            })
        },
        handleParentMode() { // 进入/退出 家长模式
            if (this.parent_flag == false) {// enter parent mode
                this.dialogParent.show = true 
            } else { // exit parent mode
                this.dialogParent.show = false 
                this.parent_flag = false // exit parent mode, goes into normal mode 
            }
            
        },
        handleSizeChange(val) {
            console.log(`now each page has ${val} items`)
            this.currentPage = 1
            this.pageSize = val
        },
        handlePageChange(val) {
            console.log(`now we are at page ${val}`)
            this.currentPage = val 
        },
        rowStyle({row, rowIndex}) {
            if (row.status == 1) {
                return  {background: 'linear-gradient(235deg,#bc6daf4f,#95b5179c,#00bbd496)'}
            } else if (row.status == -1) {
                return  {background: 'linear-gradient(90deg,#180125b3,#4d5334a4,#2d2c2c96)'}
            }
            return {}            
        },
        tableHeaderStyle ({row, column, rowIndex, columnIndex}) {
            return 'background-color:#1989fa;color:#fff;font-weight:400;'
        },
    },
    created() {
        this.getFlyInfo()
        this.getMyRank()
    },
    components: {
        AddFly,
        EditFly,
        ValidParent
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
.divbg {
    background: url(https://picgorepo.oss-cn-beijing.aliyuncs.com//2022-12-01-18-18-19README.gif) repeat;
    background-size: contain;
}
.test {
    background: linear-gradient(90deg,#180125b3,#4d5334a4,#2d2c2c96)
}
</style>