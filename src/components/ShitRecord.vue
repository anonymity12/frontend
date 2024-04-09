<template>
    <div>
    <el-menu
      mode="horizontal"
      background-color="black"
      text-color="#fff"
      active-text-color="red"
      >
      <el-menu-item>
        <a style="font-size: xx-large;" href="#/home">⬅️</a>
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 50%;font-size: 20px;font-weight: bold;color: white;text-shadow: 0 0 10px red;">
        蓝天拉屎房
      </span>
      
    </el-menu>
        <el-row class="lianhualou" :style="{ height: '100vh' }">
            <el-button @click="recordShitTime">记录拉屎时间</el-button>
            <div>
                <h2>过往拉屎记录</h2>
                <ul class="record-list">
                    <li v-for="(time, index) in shitTimesArr" :key="index">{{ time.shitDateTime }}</li>
                </ul>
            </div>
        </el-row>
    </div>
</template>

<script>
import { apiRecordShitTime } from "@/api/shitrecord"
import { apiGetAllMyShitRecords } from "@/api/shitrecord"
export default {
    data() {
        return {
            shitTimesArr: [], // 存储shit时间的数组
        };
    },
    methods: {
        recordShitTime() {
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
            var shitTimeObj = {
                dateTime: formattedDate
            }
            console.log("shit: ", formattedDate) 
            apiRecordShitTime(shitTimeObj).then(res => {
                console.log("record shit time done: res:", res)
                this.getAllMyShitRecords(); // 将当前时间添加到数组中
            });
        },
        getAllMyShitRecords() {
            apiGetAllMyShitRecords().then(res => {
                console.log("all shit res:", res)
                this.shitTimesArr = res.data.obj
                this.shitTimesArr.forEach(function(item) {
                    var utcDateTime = new Date(item.shitDateTime);  // 将字符串转换为Date对象
                    item.shitDateTime = utcDateTime.toLocaleString();  // 更新数组中的shitDateTime字段为本地时区时间字符串
                });
                this.shitTimesArr.reverse();
            })
        }
    },
    mounted(){
        this.getAllMyShitRecords()
    }
};
</script>

<style>
.lianhualou {
    background-image: url("../assets/girlOutOfToilet.jpg");
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
}
  
</style>
