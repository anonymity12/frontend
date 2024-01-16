<template>
    <div>
        <el-row class="lianhualou" :style="{ height: '100vh' }">
            <h1>睡觉莲花楼</h1>
                    <button @click="recordSleepTime">记录睡觉时间</button>

                    <div>
                        <h2>过往睡觉记录</h2>
                        <ul>
                            <li v-for="(time, index) in sleepTimes" :key="index">{{ time }}</li>
                        </ul>
                    </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sleepTimes: [], // 存储睡觉时间的数组
        };
    },
    methods: {
        recordSleepTime() {
            const currentTime = new Date().toLocaleString(); // 获取当前时间
            this.sleepTimes.push(currentTime); // 将当前时间添加到数组中
        },
    },
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
