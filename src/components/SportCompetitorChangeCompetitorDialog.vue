<template>
<div class="info" >
    <el-dialog title="选择对手" :visible.sync="dialogState.show">
    <div class="sport-competitor-table">
        <el-table 
        :data="allUserList.slice((currentPage-1)*pageSize, currentPage*pageSize)" 
        border>
            <el-table-column lable="userface" align="center">
                <template slot-scope="scope">
                    <img :src="getUserAvatar(scope.row)" width="60" height="60">
                </template>
            </el-table-column>
            <el-table-column lable="userScore" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.score }}</span>
                </template>
            </el-table-column>
            <el-table-column lable="selectHim">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleSelectCompetitor(scope.row)">⚔选定</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination align="center" @size-change="handleSizeChange" 
            @current-change="handlePageChange"
            :current-page="currentPage"
            :page-sizes="[1,5,10,20]"
            :page-size="pageSize"
            layout="prev, next"
            :total="allUserList.length">
        </el-pagination>
    </div>
    </el-dialog>
</div>
</template>

<script>
import { apiGetAllUserForSportList } from "@/api/sportrecord"
export default {
    name: "SportCompetitorChangeCompetitorDialog",
    props: {
        dialogState: Object,
    },
    data() {
        return {
            allUserList: [],
            pageSize: 6,
            currentPage: 1,
        }
    },
    methods: {
        fetchAllUserInfo() {
            apiGetAllUserForSportList().then(res => {
                this.allUserList = res.data.obj;
                // todo should filter out myself
            });
        },
        getUserAvatar(oneRowForOneUser) {
            return oneRowForOneUser.userface;
        },
        handleSizeChange(newSizeValue) {
            this.currentPage = 1;
            this.pageSize = newSizeValue;
        },
        handlePageChange(newPageNumber) {
            this.currentPage = newPageNumber;
        },
        handleSelectCompetitor(selectedCompetitor) {
            this.$emit('competitorSelected', selectedCompetitor.userId);
            dialogState.show = false;
        },
    }
}
</script>

<style scoped>
</style>