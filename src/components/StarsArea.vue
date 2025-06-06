<template>
    <div id="stars-container">
        <el-row type="flex" class="progress-star" justify="space-between">
            <el-progress class="day-progress" type="circle" :width="60" :stroke-width="7" :percentage="this.dayProgress" :color="customColors"></el-progress>
            <el-progress class="month-progress" type="circle" :width="60" :stroke-width="7" :percentage="this.monthProgress" :color="customColors"></el-progress>
            <el-progress class="year-progress" type="circle" :width="60" :stroke-width="7" :percentage="this.yearProgress" :color="customColors"></el-progress>
        </el-row>
        <el-row class="today-description">
            <p>今天是 {{ this.yearString }} 年 第 {{ this.xthWeek }} 周, 第 {{ this.xthDay }} 天</p>
            <p>也是你和这个世界互动的第 {{ this.userLifePassed }} 天 ⌚️, 总计获得星星 {{ this.starCnts }} 个。 继续加油获得星星吧</p>
        </el-row>
        <el-row align="bottom">
            <el-col :span="24" class="i-need-margin">
                <el-progress :stroke-width="12" :percentage="this.starToThousandPrecentage" :color="myColor"></el-progress>
            </el-col>
        </el-row>
        <el-row>
            <i class="el-icon-circle-plus-outline" style="color: #00FF00; font-size:50px; margin-top: 2px; text-shadow: 2px 2px 3px red;" @click="recordOneStar"></i>
            <img 
                v-show="stars.length >= 4" 
                src="../assets/img/gamble.png" 
                @click="handleGamble" 
                style="width: 50px; height: 50px; margin-left: 10px; cursor: pointer;"
            >
        </el-row>

        <div class="all-stars">
            <div v-for="star in stars" :key="star.starDateTime">
                <img src="../assets/starSmile.jpg"  @click="openStarDetail(star)" alt="星星图" style="width: 50px; height: 50px;">
            </div>
        </div>
        <div class="botton-divider"/>
        <RecordStarDialog @recordDone="getMyThisWeekRecords" :dialogStatus="starConfirmDialogStatus" :reason="awardReason"></RecordStarDialog>
        <ReviewStarDialog :dialogStatus="starReviewDialogStatus" :starModel="clickedStarModel"></ReviewStarDialog>
    </div>
</template>

<script>
import { apiGetMyThisWeekStarRecords } from "@/api/star"
import { apiGetAllMyStarCnts } from "@/api/star"
import { apiGetMyGold } from '@/api/gold'
import { getLifeIndicator } from '@/api/user'
import RecordStarDialog from './RecordStarDialog'
import ReviewStarDialog from './ReviewStarDialog'

export default {
    name: "StarsArea",
    data() {
        return {
            stars: [
                {
                    starDateTime: '2024-04-12',
                    starDescription: 'stay happy',
                },
            ],
            starCnts: 1,
            starConfirmDialogStatus: {
                show: false
            },
            starReviewDialogStatus: {
                show: false
            },
            awardReason: '比如我今天做了10个深蹲',
            clickedStarModel: {
                imageUrl: require("../assets/starSmile.jpg"),
                reason: '今天做了10个深蹲'
            },
            myColor: "#00FF00",
            userLifePassed: 10000,
            customColors: [
                {color: '#f56c6c', percentage: 20},
                {color: '#e6a23c', percentage: 40},
                {color: '#5cb87a', percentage: 100},
            ],
        }
    },
    methods: {
        recordOneStar() {
            this.starConfirmDialogStatus.show = true
        },
        getMyThisWeekRecords() {
            apiGetMyThisWeekStarRecords().then(res => {
                console.log("apiGetMyThisWeekStarRecords return: ", res)
                this.stars = res.data.obj
                this.$emit("refreshStarRaceBay")
            })
            apiGetAllMyStarCnts().then(res => {
                this.starCnts = res.data.obj
            })
            apiGetMyGold().then(res => {
                this.$store.commit('SET_COINS', res.data.obj);
            })
        },
        openStarDetail(star) {
            this.clickedStarModel = {
                imageUrl: require("../assets/starSmile.jpg"),
                reason: star.starDescription
            }
            this.starReviewDialogStatus.show = true
        },
        callGetLifeIndicator() {
            getLifeIndicator().then(resp => {
                if (resp.status === 200) {
                    this.userLifePassed = resp.data.obj.dayPassed
                    console.log("this.userLifePassed", this.userLifePassed)
                } else {
                    console.log("can not get user life day passed from backend")
                }
            })
        },
        handleGamble() {
            this.$router.push('/prizeWheel')
        }
    },
    mounted() {
        this.getMyThisWeekRecords();
        this.callGetLifeIndicator();
    },
    computed: {
        cosmosTime() {
            const today = new Date()
            const targetDate = new Date('2021-06-06')
            const diffInDays = Math.floor((today - targetDate) / (1000 * 60 * 60 * 24))
            console.log(`今天到2021年6月6日共计 ${diffInDays} 天`);
            return diffInDays
        },
        starToThousandPrecentage() {
            return this.starCnts / 10;
        },
        dayProgress() {
            let now = new Date()
            let curHour = now.getHours()
            return Number((100 - ((curHour / 24) * 100)).toFixed(2));
        },
        monthProgress() {
            let today = new Date(); // 获取当前日期
            let year = today.getFullYear(); // 获取当前年份
            let month = today.getMonth(); // 获取当前月份，注意月份是从0开始计数的
            let firstDayOfMonth = new Date(year, month, 1); // 获取本月第一天
            let lastDayOfMonth = new Date(year, month + 1, 0); // 获取本月最后一天,5月31日
            let totalDaysInMonth = lastDayOfMonth.getDate(); // 本月的总天数,31
            let dayOfMonth = today.getDate(); // 当前日期是本月的第几天， 5月7日，返回7
            let percentage = 100 - (dayOfMonth / totalDaysInMonth) * 100; // 计算百分比
            return Number(percentage.toFixed(2)); // 保留两位小数
        },
        yearProgress() {
            let today = new Date(); // 获取当前日期
            let year = today.getFullYear(); // 获取当前年份
            // 获取今年第一天和最后一天的日期对象
            let firstDayOfYear = new Date(year, 0, 1);
            let lastDayOfYear = new Date(year, 11, 31);
            // 计算从年初到当前日期的天数差
            let oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
            let daysPassed = Math.floor((today - firstDayOfYear) / oneDay);
            // 判断是否为闰年
            let isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
            let totalDaysInYear = isLeapYear ? 366 : 365;
            // 计算百分比
            let percentage = 100 - (daysPassed / totalDaysInYear) * 100;
            return Number(percentage.toFixed(2)); // 保留两位小数
        },
        today5StarProgress() {
            return 10 // todo
            // return todayCounts / 5
        },
        monthly100StarProgress() {
            return 10 // todo, low proirity
            // return monthCounts / 100
        },
        xthDay () {
            let date = new Date();
            return date.getDay();
        },
        xthWeek() {
            let date = new Date();
            let year = date.getFullYear();
            let firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            let pastDaysOfYear = (date - firstDayOfYear) / 8.64e7 + 1;
            return Math.ceil(pastDaysOfYear / 7);
        },
        yearString() {
            return new Date().getFullYear();
        },
    },
    components: {
        RecordStarDialog,
        ReviewStarDialog
    }
}
</script>

<style>
.all-stars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.botton-divider {
    height: 80px;
}
.progress-star {
    display: flex;
    justify-content: right;
}
.day-progress::before {
  content: "日"; /* 这里设置显示的汉字内容 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #FFF1CB00; /* 黑色背景，50%的透明度 */
  color: rgba(1, 1, 1, 0.7); /* 文字颜色 */
  text-align: center;
  line-height: 2em; /* 根据实际进度条高度调整 */
  font-size: 14px; /* 根据需要调整字体大小 */
  pointer-events: none; /* 防止伪元素影响点击事件 */
}
.month-progress::before {
  content: "月"; /* 这里设置显示的汉字内容 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #FFF1CB00; /* 黑色背景，50%的透明度 */
  color: rgba(1, 1, 1, 0.7); /* 文字颜色 */
  text-align: center;
  line-height: 2em; /* 根据实际进度条高度调整 */
  font-size: 14px; /* 根据需要调整字体大小 */
  pointer-events: none; /* 防止伪元素影响点击事件 */
}
.year-progress::before {
  content: "年"; /* 这里设置显示的汉字内容 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #FFF1CB00; /* 黑色背景，50%的透明度 */
  color: rgba(1, 1, 1, 0.7); /* 文字颜色 */
  text-align: center;
  line-height: 2em; /* 根据实际进度条高度调整 */
  font-size: 14px; /* 根据需要调整字体大小 */
  pointer-events: none; /* 防止伪元素影响点击事件 */
}
.i-need-margin {
    margin-top: 16px;
}
.today-description {
    font-size: 14px;
    font-family: sans-serif;
}
</style>