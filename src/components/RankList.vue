<template>
    <div>
    <el-menu
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      >
      <el-menu-item>
        <a style="font-size: xx-large;" href="#/home"> β¬οΈ </a>
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;font-size: 15px;font-weight: bold">
        ζε
      </span>
      
    </el-menu>
      
    <el-card v-for="item in rankList" :key="item.userId"
        style="margin-bottom: 12px;">
        <el-avatar 
            :src="item.userface"
            :size="100"></el-avatar>
        <p>{{ item.cname }}</p>
        <span>π¦οΌ{{ item.growFlyCnt }}</span>
        <span>π₯οΌ{{ item.babyFlyCnt }}</span>
        <span>ποΌ{{ item.diedFlyCnt }}</span>
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
        // 0204 θθδΈζε·ζ°
        initRankList() {
            apiGetRankList().then(res => {
                console.log("get rank list: ret: " ,res)
                this.rankList = res.data
            })
        }
    }
    
}
</script>