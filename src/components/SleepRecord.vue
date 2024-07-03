<template>
    <div>
    <el-menu
        mode="horizontal"
        background-color="black"
        text-color="#FFF">
        <el-menu-item>
            <a style="font-size: xx-large;" @click="goBack">X</a>
        </el-menu-item>
        <span style="position: absolute;padding-top: 20px;right: 35%;font-size: 20px;font-weight: bold;color: white;text-shadow: 0 0 10px red;">
            睡觉莲花楼
        </span>
    </el-menu>
    <el-row class="lianhualou" :style="{ height: '100vh' }">
        <el-button @click="recordSleepTime">记录睡觉时间</el-button>
        <div>
            <h2>过往睡觉记录</h2>
            <ul class="record-list">
                <li v-for="(time, index) in sleepTimesArr" :key="index">{{ time.sleepDateTime }}</li>
            </ul>
        </div>
    </el-row>
    </div>
</template>

<script>
import { apiRecordSleepTime } from "@/api/sleeprecord"
import { apiGetAllMySleepRecords } from "@/api/sleeprecord"
export default {
    data() {
        return {
            sleepTimesArr: [], // 存储睡觉时间的数组
        };
    },
    methods: {
        recordSleepTime() {
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
            var sleepTimeObj = {
                dateTime: formattedDate
            }
            console.log("sleep: ", formattedDate) //sleep:  
            apiRecordSleepTime(sleepTimeObj).then(res => {
                console.log("record sleep time done: res:", res)
                this.getAllMySleepRecords(); // 将当前时间添加到数组中
            });
        },
        getAllMySleepRecords() {
            apiGetAllMySleepRecords().then(res => {
                console.log("all sleep res:", res)
                this.sleepTimesArr = res.data.obj
                this.sleepTimesArr.forEach(function(item) {
                    var utcDateTime = new Date(item.sleepDateTime);  // 将字符串转换为Date对象
                    item.sleepDateTime = utcDateTime.toLocaleString();  // 更新数组中的sleepDateTime字段为本地时区时间字符串
                });
                this.sleepTimesArr.reverse();
            })
        },
        goBack() {
            window.history.back();
        },
    },
    mounted(){
        this.getAllMySleepRecords()
    }
};
</script>

<style>
.lianhualou {
    background-image: url("../assets/sleepLotusRoom.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    /* 添加其他背景样式属性，例如颜色、透明度等 */
    color: white;
    /* 文本颜色 */
    margin: 0;
    /* 去除页面默认的外边距 */
    padding: 0;
    /* 去除页面默认的内边距 */
    /* 让body元素填充整个视口高度 */
}
.record-list {
    display: flex;
    flex-direction: column; /* 让子元素垂直排列 */
    list-style: none; /* 去掉列表默认样式 */
    padding: 0; /* 去掉内边距 */
  }
.record-list li {
    /* 可选样式，增加一些间距或其他样式 */
    margin-bottom: 5px;
    text-shadow: 3px 3px 3px blue;
    font-weight: bold;
}
  
</style>
