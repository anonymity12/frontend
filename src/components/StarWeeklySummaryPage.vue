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
    一周总结
    </span>
</el-menu>
<p class="week-summary-paragraph">
本周获得星星最多的第一名 🥇是 {{ firstManName }}, <img style="width: 50px; height: 50px;border-radius: 50%;" :src="firstManFace"/> 
{{ firstManName }} 获得了 {{ firstManCnt }} 个星星  😁. 

第二名是 {{ secondManName }}, <img style="width: 50px; height: 50px;border-radius: 50%;" :src="secondManFace"/> 
{{ secondManName }}  获得了 {{ secondManCnt }} 个星星   👍

第三名是 {{ thirdManName }}, <img style="width: 50px; height: 50px;border-radius: 50%;" :src="thirdManFace"/> 
{{ thirdManName }}  获得了 {{ thirdManCnt }} 个星星   👍

其他榜上有名的为: {{ othersName }} 👌

根据排名,本周大奖金额 💴 分配如下:

<img style="width: 50px; height: 50px;border-radius: 50%;" :src="firstManFace"/> {{ firstManName }} : $58
 
<img style="width: 50px; height: 50px;border-radius: 50%;" :src="secondManFace"/> {{ secondManName }} : $19
 
<img style="width: 50px; height: 50px;border-radius: 50%;" :src="thirdManFace"/> {{ thirdManName }} : $5.5

其他人 : {{ othersName }} 分别得到 $2

一个人一旦全身心投入，就会触动冥冥中的天意 --- 《高效能人士的七个习惯》
 

<el-button @click="gotoStarRoad">一路星光🌟</el-button>
</p>
</div>
</template>

<script>
import { apiGetStarWeeklyData } from "@/api/star"
export default {
    name: "StarWeeklySummaryPage",
    data() {
        return {
            userAndTheirStarCount: [
                {
                    userId: 0,
                    username: 'tt1',
                    userface: '../assets/starSmile.jpg',
                    cnt: 3
                },
                {
                    userId: 1,
                    username: 'tt2',
                    userface: '../assets/starSmile.jpg',
                    cnt: 5
                },
            ]
        }
    },
    computed: {
        firstManName() {
            return this.userAndTheirStarCount[0].username
        },
        firstManCnt() {
            return this.userAndTheirStarCount[0].cnt
        },
        firstManFace() {
            return this.userAndTheirStarCount[0].userface
        },
        secondManName() {
            return this.userAndTheirStarCount[1].username
        },
        secondManCnt() {
            return this.userAndTheirStarCount[1].cnt
        },
        secondManFace() {
            return this.userAndTheirStarCount[1].userface
        },
        thirdManName() {
            return this.userAndTheirStarCount[2].username
        },
        thirdManCnt() {
            return this.userAndTheirStarCount[2].cnt
        },
        thirdManFace() {
            return this.userAndTheirStarCount[2].userface
        },
        othersName() {
            return this.userAndTheirStarCount.slice(3).map(user => user.username).join(',');
        }
    },
    methods: {
        getStarWeeklyData() {
            apiGetStarWeeklyData().then(res => {
                this.userAndTheirStarCount = res.data.obj
            })
        },
        goBack() {
            window.history.back();
        },
        gotoStarRoad() {
            this.$router.push("/starRoad")
        },
    },
    mounted() {
        this.getStarWeeklyData()
    }
}

</script>


<style scoped>
.week-summary-paragraph {
    white-space: pre-line;
    text-align: left;
    font-size: 24px;
    font-family: 'MaShanZheng-Regular', sans-serif;
    margin-bottom: 100px
}
</style>