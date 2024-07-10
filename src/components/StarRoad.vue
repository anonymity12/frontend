<template>
  <div>
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
    星海栈道
    </span>
  </el-menu>
  <el-table :data="tableData" border empty-text="暂无考核项" :show-header="false">
    <el-table-column align="center" v-for="(item, index) in tableData " :key="index" width="160">
      <template #default="scope">
        <div v-if="scope.$index == 0 && index > 0">
            <img :src="scope.row[index]" style="width: 50px; height: 50px;" />
        </div>
        <div v-else>{{ scope.row[index] }}</div>
      </template>
    </el-table-column>
  </el-table>
  <el-button>100金币查看所有神秘任务</el-button>
  <div style="height: 80px"/>
  </div>
</template>

<script>
import { apiGetStarRoad } from "@/api/star"
export default {
  name: "StarRoad",

  data() {
    return {
      tableData: [
        {
          userId: 1,
          userface: "https://avatars.githubusercontent.com/u/10313622?v=4",
          username: "tt",
          stars: [
            {
              id: 1,
              owner: 2,
              starDateTime: '2023-09-01',
              starDescription: 'i write book'
            },
            {
              id: 1,
              owner: 2,
              starDateTime: '2023-09-01',
              starDescription: 'i read book'
            }
          ]
        },
        {
          userId: 1,
          userface: "https://avatars.githubusercontent.com/u/10313622?v=4",
          username: "tt",
          stars: [
            {
              id: 1,
              owner: 2,
              starDateTime: '2023-08-01',
              starDescription: 'she write book'
            },
            {
              id: 1,
              owner: 2,
              starDateTime: '2023-08-01',
              starDescription: 'he read book'
            }
          ]
        },
      ],
    };
  },
  methods: {
    getStarRoad() {
      apiGetStarRoad().then(res => {
        console.log(res.data.obj);
        this.tableData = this.formatSettings(res.data.obj);
        console.log(this.tableData);
      })
    },
    formatSettings(data) {
      if (!data || !data.length) return []
      let userfaceList = ['面部识别']
      let usernameList = ['世界代号']
      let starRow0 = ['🌟']
      let starRow1 = ['🌟']
      let starRow2 = ['🌟']
      let starRow3 = ['🌟']
      let starRow4 = ['🌟']
      let starRow5 = ['🌟']
      let starRow6 = ['🌟']
      let starRow7 = ['🌟']
      let starRow8 = ['🌟']
      data.forEach(item => {
        userfaceList.push(item.userface)
        usernameList.push(item.username)
        starRow0.push(item.stars[0]? (item.stars[0]['starDescription']?item.stars[0]['starDescription']:"--"):"xx")
        starRow1.push(item.stars[1]? (item.stars[1]['starDescription']?item.stars[1]['starDescription']:"--"):"xx")
        starRow2.push(item.stars[2]? (item.stars[2]['starDescription']?item.stars[2]['starDescription']:"--"):"xx")
        starRow3.push(item.stars[3]? (item.stars[3]['starDescription']?item.stars[3]['starDescription']:"--"):"xx")
        starRow4.push(item.stars[4]? (item.stars[4]['starDescription']?item.stars[4]['starDescription']:"--"):"xx")
        starRow5.push(item.stars[5]? (item.stars[5]['starDescription']?item.stars[5]['starDescription']:"--"):"xx")
        starRow6.push(item.stars[6]? (item.stars[6]['starDescription']?item.stars[6]['starDescription']:"--"):"xx")
        starRow7.push(item.stars[7]? (item.stars[7]['starDescription']?item.stars[7]['starDescription']:"--"):"xx")
        starRow8.push(item.stars[8]? (item.stars[8]['starDescription']?item.stars[8]['starDescription']:"--"):"xx")
        // special task mask for mom
        if (item.username == "小花") {
          //splice(-1, 1)[0];
          starRow0.splice(-1, 1);starRow0.push("我完成了一个神秘任务")
          starRow1.splice(-1, 1);starRow1.push("我完成了一个神秘任务")
          starRow2.splice(-1, 1);starRow2.push("我完成了一个神秘任务")
          starRow3.splice(-1, 1);starRow3.push("我完成了一个神秘任务")
          starRow4.splice(-1, 1);starRow4.push("我完成了一个神秘任务")
          starRow5.splice(-1, 1);starRow5.push("我完成了一个神秘任务")
          starRow6.splice(-1, 1);starRow6.push("我完成了一个神秘任务")
          starRow7.splice(-1, 1);starRow7.push("我完成了一个神秘任务")
          starRow8.splice(-1, 1);starRow8.push("我完成了一个神秘任务")
        }
      })
      return [userfaceList, usernameList, starRow0, starRow1,starRow2,starRow3,starRow4,starRow5,starRow6,starRow7,starRow8,]
    },
    goBack() {
      window.history.back();
    },
  },
  mounted() {
    this.getStarRoad();
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-name {
  margin-top: 5px;
  font-weight: bold;
}
</style>