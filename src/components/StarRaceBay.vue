<template>
    <div id="statistic-container">
    <span><b>🏅️排行榜🏅️</b></span>
        <div class="all-statistic" v-for="item in userAndTheirStarCount" :key="item.userId">
            <div style="display: flex; align-items: center;">
                <el-avatar 
                    style="color: #222; margin: 20px;"
                    :src="item.userface"
                    :size="50"
                    >
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
                    userId: 15,
                    username: 'tt1',
                    userface: 'https://user.img.jpg',
                    cnt: 3
                },
                {
                    userId: 14,
                    username: 'tt2',
                    userface: 'https://user1.img.jpg',
                    cnt: 5
                },
                {
                    userId: 17,
                    username: 'tt4',
                    userface: 'https://user2.img.jpg',
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
        openUserStarHistory() {
            console.log("not implement yet")
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