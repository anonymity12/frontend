
<template>
  <div class="page">
    <el-menu
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      >
      <el-menu-item>
        <a style="font-size: xx-large;" @click="goBack">X</a>
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">
        运动大竞赛
      </span>
    </el-menu>
    <el-row>
      <el-col :span="12">
        <div class="left-card">
          <el-row>
            <el-avatar :size="50" :src="currentUser.userface">
            </el-avatar>
          </el-row>
          <el-table :data="sportTimesArr" style="width: 100%">
            <el-table-column prop="sportDateTime" label="时间"></el-table-column>
            <el-table-column prop="sportContent" label="内容"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right-card">
          <el-row>
            <div @click="showChangeCompetitorDialog">
              <el-avatar :size="50" :src="competitorUser.userface">
              </el-avatar>
            </div>
          </el-row>
          <el-table :data="competitorSportTimesArr" style="width: 100%">
            <el-table-column prop="sportDateTime" label="时间"></el-table-column>
            <el-table-column prop="sportContent" label="内容"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row class="floating-button">
      <el-button type="primary" icon="el-icon-plus" @click="recordSportTime">打卡</el-button>
    </el-row>
    <SportCompetitorChangeCompetitorDialog :dialogState="changeCompetitorDialog"
      @competitorSelected="handleSelectCompetitor"/>
  </div>
</template>

<script>
import { apiRecordSportTime } from "@/api/sportrecord"
import { apiGetAllMySportRecords } from "@/api/sportrecord"
import { apiGetCompetitorRecords } from "@/api/sportrecord"
import { apiGetAllUserForSportList } from "@/api/sportrecord"

import { apiGetUserInfo } from "@/api/user"
import { apiGetOtherUserInfo } from "@/api/user"

import SportCompetitorChangeCompetitorDialog from './SportCompetitorChangeCompetitorDialog.vue'

export default {
  data() {
    return {
      sportTimesArr: [], // 左侧, 你自己列表数据
      competitorSportTimesArr: [], // 右侧，对手列表数据
      competitorId: 16,
      currentUser: {},
      competitorUser: {},
      changeCompetitorDialog: {
        show: false,
      },
    };
  },
  methods: {
    showChangeCompetitorDialog() {
      console.log("change dialog showed");
      this.changeCompetitorDialog.show = true;
    },
    recordSportTime() {
        const currentTime = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
            };
        const formattedDate = currentTime.toLocaleString('en-US', options);
        var sportTimeObj = {
            dateTime: formattedDate
        }
        console.log("sport: ", formattedDate) 
        apiRecordSportTime(sportTimeObj).then(res => {
            console.log("record sport time done: res:", res)
            this.getAllMySportRecords(); // 将当前时间添加到数组中
        });
    },
    handleSelectCompetitor(competitorId) {
      this.competitorId = competitorId;
      this.fetchOtherUserInfo();
    },
    // ---- mounted() methods: -------
    getAllMySportRecords() {
      apiGetAllMySportRecords().then(res => {
          this.sportTimesArr = res.data.obj
          this.sportTimesArr.forEach(function(item) {
              var utcDateTime = new Date(item.sportDateTime);  // 将字符串转换为Date对象
              item.sportDateTime = utcDateTime.toLocaleString();  // 更新数组中的sportDateTime字段为本地时区时间字符串
          });
          this.sportTimesArr.reverse();
      })
    },
    getCompetitorRecords() {
      apiGetCompetitorRecords(this.competitorId).then(res => {
          console.log("competitor sport res:", res)
          this.competitorSportTimesArr = res.data.obj
          this.competitorSportTimesArr.forEach(function(item) {
              var utcDateTime = new Date(item.sportDateTime);  // 将字符串转换为Date对象
              item.sportDateTime = utcDateTime.toLocaleString();  // 更新数组中的sportDateTime字段为本地时区时间字符串
          });
          this.competitorSportTimesArr.reverse();
      })
    },
    fetchCurrentUserInfo() {
      apiGetUserInfo().then(res => {
        this.currentUser = res.data.obj;
      })
    },
    fetchOtherUserInfo() {
      console.log("fetching other user info from backend");
      apiGetOtherUserInfo(this.competitorId).then(res => {
        console.log("fetched other user(competitor) info as: ", res);
        this.competitorUser = res.data.obj;
      })
    },
    goBack() {
      window.history.back();
    },
  },
  mounted() {
    this.getAllMySportRecords();
    this.getCompetitorRecords();
    this.fetchCurrentUserInfo();
    this.fetchOtherUserInfo();
  },
  components: {
    SportCompetitorChangeCompetitorDialog
  }
};
</script>

<style scoped>
.page {
  padding: 2px;
}
.left-card {
  background-color: #ffcccc;
}
.right-card {
  background-color: #cceeff;
}
.floating-button {
  position: fixed;
  bottom: 60px;
  margin-left: auto;
  margin-right: auto;
  text-align:center;
}
</style>
