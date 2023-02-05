<template>
    <div>
    <el-menu
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      >
      <el-menu-item>
        <a href="#/home"> ⬅️ </a>
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">
        现在蝴蝶谷的排名情况如下：（每3分钟更新）
      </span>
      
    </el-menu>
      
    <el-card v-for="item in rankList" :key="item.userId"
        style="width: 60%; margin-bottom: 12px;">
        <el-avatar 
            :src="item.userface"
            :size="150"></el-avatar>
        <p>{{ item.cname }}</p>
    </el-card>
    </div>
</template>
<script>
import { apiGetRankList } from '@/api/user'

export default {
    name: "RankList",
    data() {
        return {
            rankList: []
        }
    },
    mounted() {
        this.initRankList();
    },
    methods: {
        // 0204 考虑下拉刷新
        initRankList() {
            apiGetRankList().then(res => {
                console.log("get rank list: ret: " ,res)
                this.rankList = res.data
            })
        }
    }
    
}
</script>