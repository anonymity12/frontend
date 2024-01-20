<template>
    <div>
        <el-row class="lianhualou" :style="{ height: '100vh' }">
            <h1>睡觉莲花楼</h1>
                    <button @click="recordSleepTime">记录睡觉时间</button>

                    <div>
                        <h2>过往睡觉记录</h2>
                        <ul>
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
            const currentTime = new Date().toLocaleString(); // 获取当前时间
            var sleepTimeObj = {
                dateTime: currentTime
            }
            apiRecordSleepTime(sleepTimeObj)
            this.sleepTimesArr.push(currentTime); // 将当前时间添加到数组中
        },
        getAllMySleepRecords() {
            apiGetAllMySleepRecords().then(res => {
                console.log("all sleep res:", res)
                this.sleepTimesArr = res.data.obj
                this.sleepTimesArr.forEach(function(item) {
                    var utcDateTime = new Date(item.sleepDateTime);  // 将字符串转换为Date对象
                    item.sleepDateTime = utcDateTime.toLocaleString();  // 更新数组中的sleepDateTime字段为本地时区时间字符串
                });
            })
        }
    },
    mounted(){
        this.getAllMySleepRecords()
    }
};
</script>

<style>
.lianhualou {
    background-image: url("https://picgorepo.oss-cn-beijing.aliyuncs.com/2024-01-14-00-10-07.png");
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
</style>
