<template>
    <div id="stars-container">
        <el-row type="flex" class="progress-star" justify="space-between">
            <el-col :span="8">
                <el-button type="primary" icon="el-icon-plus" @click="recordOneStar"></el-button>
            </el-col>
            <el-col :span="16" style="text-align: left; font-size:10px;">
                <el-row>
                    <el-progress class="day-progress" type="circle" :width="60" :stroke-width="3" :percentage="this.dayProgress" color="#32A937"></el-progress>
                    <el-progress class="month-progress" type="circle" :width="60" :stroke-width="3" :percentage="this.monthProgress" color="#f56c6c"></el-progress>
                    <el-progress class="year-progress" type="circle" :width="60" :stroke-width="3" :percentage="this.yearProgress" color="#EFCF75"></el-progress>
                </el-row>
                <el-row>
                    <p>今天是 {{ this.yearString }} 年 第 {{ this.xthWeek }} 周, 第 {{ this.xthDay }} 天</p>
                    <p>乖娃娃第 {{ this.cosmosTime }} 天👍获得星星 {{ this.starCounts }} 个</p>
                </el-row>
            </el-col>
        </el-row>
        <el-progress :percentage="this.starCounts"></el-progress>

        <div class="all-stars">
            <div v-for="star in stars" :key="star.starDateTime">
                <img src="../assets/starSmile.jpg"  @click="openStarDetail(star)" alt="星星图" style="width: 60px; height: 60px;">
            </div>
        </div>
        <div class="botton-divider"/>
        <RecordStarDialog @recordDone="getAllMyStarRecords" :dialogStatus="starConfirmDialogStatus" :reason="awardReason"></RecordStarDialog>
        <ReviewStarDialog :dialogStatus="starReviewDialogStatus" :starModel="clickedStarModel"></ReviewStarDialog>
    </div>
</template>

<script>
import { apiGetAllMyStarRecords } from "@/api/star"
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
                {
                    starDateTime: '2024-04-13',
                    starDescription: 'stay foolish',
                },
                {
                    starDateTime: '2024-04-13',
                    starDescription: 'stay real',
                },
                {
                    starDateTime: '2024-04-13',
                    starDescription: 'stay foolish',
                },
            ],
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
            }
        }
    },
    methods: {
        recordOneStar() {
            this.starConfirmDialogStatus.show = true
        },
        getAllMyStarRecords() {
            apiGetAllMyStarRecords().then(res => {
                console.log("apiGetAllMyStarRecords return: ", res)
                this.stars = res.data.obj
            })
        },
        openStarDetail(star) {
            this.clickedStarModel = {
                imageUrl: require("../assets/starSmile.jpg"),
                reason: star.starDescription
            }
            this.starReviewDialogStatus.show = true
        }
    },
    mounted() {
        this.getAllMyStarRecords();
    },
    computed: {
        cosmosTime() {
            const today = new Date()
            const targetDate = new Date('2021-06-06')
            const diffInDays = Math.floor((today - targetDate) / (1000 * 60 * 60 * 24))
            console.log(`今天到2021年6月6日共计 ${diffInDays} 天`);
            return diffInDays
        },
        starCounts() {
            return this.stars.length;
        },
        dayProgress() {
            let now = new Date()
            let curHour = now.getHours()
            return ((curHour / 24) * 100).toFixed(2);
        },
        monthProgress() {
            let today = new Date(); // 获取当前日期
            let year = today.getFullYear(); // 获取当前年份
            let month = today.getMonth(); // 获取当前月份，注意月份是从0开始计数的
            let firstDayOfMonth = new Date(year, month, 1); // 获取本月第一天
            let lastDayOfMonth = new Date(year, month + 1, 0); // 获取本月最后一天,5月31日
            let totalDaysInMonth = lastDayOfMonth.getDate(); // 本月的总天数,31
            let dayOfMonth = today.getDate(); // 当前日期是本月的第几天， 5月7日，返回7
            let percentage = (dayOfMonth / totalDaysInMonth) * 100; // 计算百分比
            return percentage.toFixed(2); // 保留两位小数
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
            let percentage = (daysPassed / totalDaysInYear) * 100;
            return percentage.toFixed(2); // 保留两位小数
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
  background-color: #FFF1CB88; /* 黑色背景，50%的透明度 */
  color: rgba(1, 1, 1, 0.5); /* 文字颜色 */
  text-align: center;
  line-height: 20px; /* 根据实际进度条高度调整 */
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
  background-color: #FFF1CB88; /* 黑色背景，50%的透明度 */
  color: rgba(1, 1, 1, 0.5); /* 文字颜色 */
  text-align: center;
  line-height: 20px; /* 根据实际进度条高度调整 */
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
  background-color: #FFF1CB88; /* 黑色背景，50%的透明度 */
  color: rgba(1, 1, 1, 0.5); /* 文字颜色 */
  text-align: center;
  line-height: 20px; /* 根据实际进度条高度调整 */
  font-size: 14px; /* 根据需要调整字体大小 */
  pointer-events: none; /* 防止伪元素影响点击事件 */
}
</style>