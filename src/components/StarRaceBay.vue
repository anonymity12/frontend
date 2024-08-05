<template>
    <div id="statistic-container">
    <span><b>🏅️星星银行🏅️</b></span>
        <div class="all-statistic" v-for="item in userAndTheirStarCount" :key="item.userId">
            <div style="display: flex; justify-content: right;align-items: center;" @click="gotoStarRoad()">
                <el-avatar 
                    style="color: #fff; margin: 20px;"
                    :src="item.userface"
                    :size="70"
                    :fit="'cover'">
                </el-avatar>
                <span>{{ item.username }}🔮</span>
                <span><b>{{ item.cnt }}</b></span>
                <span v-for="n in item.cnt" :key="n" >
                    🌟
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { apiGetStarRaceBayData } from "@/api/star"
export default {
    name: "StarRaceBay",
    data() {
        return {
            userAndTheirStarCount: [
                {
                    userId: 0,
                    username: 'tt1',
                    userface: '../assets/starSmile2.jpg',
                    cnt: 3
                },
                {
                    userId: 1,
                    username: 'tt4',
                    userface: '../assets/starSmile.jpg',
                    cnt: 7
                },
            ]
        }
    },
    methods: {
        getStarRecordsOfAllUsersRecently() {
            apiGetStarRaceBayData().then(res => {
                console.log("apiGetStarRaceBayData", res.data.obj)
                this.userAndTheirStarCount = res.data.obj
            })
        },
        openWeeklySummaryPage() {
            this.$router.push({ path: '/weeklySummary' })
        },
        gotoStarRoad() {
            this.$router.push("/starRoad")
        },
    },
    mounted() {
        this.getStarRecordsOfAllUsersRecently()
    }
}

</script>
<style scoped>
.all-statistic {
    display: flex;
    justify-content: left;
    white-space: nowrap;
    overflow-x: auto;
}
</style>