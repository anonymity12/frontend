<template>
<div class="week-summary-paragraph">
<el-menu
    mode="horizontal"
    background-color="yellow"
    text-color="red"
    active-text-color="red"
    >
    <el-menu-item>
    <a style="font-size: xx-large;" @click="goBack">X</a>
    </el-menu-item>
    <span style="position: absolute;padding-top: 5px;right: 30%;font-size: 30px;font-weight: bold">
    🌟星星银行🏦
    </span>
</el-menu>
<p >
🥇本周获得星星最多的第一名🥇是
 {{ firstManName }}, <img style="width: 50px; height: 50px;border-radius: 50%;" :src="firstManFace"/> 
{{ firstManName }} 获得了 {{ firstManCnt }} 个星星  😁. 

🥈第二名🥈是 
{{ secondManName }}, <img style="width: 50px; height: 50px;border-radius: 50%;" :src="secondManFace"/> 
{{ secondManName }}  获得了 {{ secondManCnt }} 个星星   👍

🥉第三名🥉是 {{ thirdManName }}, <img style="width: 50px; height: 50px;border-radius: 50%;" :src="thirdManFace"/> 
{{ thirdManName }}  获得了 {{ thirdManCnt }} 个星星   👍

其他榜上有名的为: {{ othersName }} 👌

根据排名,本周金币 💴 分配如下:

<img style="width: 50px; height: 50px;border-radius: 50%;" :src="firstManFace"/> {{ firstManName }} :  💴 32
 
<img style="width: 50px; height: 50px;border-radius: 50%;" :src="secondManFace"/> {{ secondManName }} :💴 18  
 
<img style="width: 50px; height: 50px;border-radius: 50%;" :src="thirdManFace"/> {{ thirdManName }} :💴  8  

其他人 : {{ othersName }} 分别得到 💴 2

蒙台梭利所认为的正常孩子是：智慧早熟、已学会克制自我、平静地生活，以及宁可有秩序地工作而不愿无所事事 --- 《读懂孩子的心》樊登

</p>
<el-button type="danger" style="margin-bottom: 50px;" @click="gotoStarRoad">👉去往一路星光🌟</el-button>

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
    text-align: center;
    font-size: 24px;
    font-family: 'MaShanZheng-Regular', sans-serif;
    margin-bottom: 50px
}
</style>