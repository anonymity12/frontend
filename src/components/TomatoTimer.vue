<template>
    <div style="height: 100vh;">
        <a style="font-size: xx-large;" href="#/xuanguan">⬅️</a>
        <h1>🍅我的番茄钟🍅</h1>
        <p v-if="isWorking">劳动时间</p>
        <p v-else>安逸时间</p>
        <el-button type="success" @click="startTimer" v-if="!isRunning">开始番茄钟计时</el-button>
        <el-button type="danger" @click="stopTimer" v-else>停止番茄钟计时</el-button>
        <div class="timer-text">{{ formattedTime }}</div>
        <br>
        <el-input v-model="timerLengthPreSetting" :style="{ width: '100px' }" placeholder="输入你自定义的时间"></el-input>
        <el-button type="info" @click="resetTimer">重新设定番茄钟</el-button>
        <p>今日完成：{{ todayTomatoCounts }}</p>
        <p>全部完成：{{ totalTomatoCounts }}</p>
    </div>
</template>

<script>
import { apiFinishTomato } from '../api/tomato';
import { apiGetTodayTomatoCounts } from '../api/tomato';
import { apiGetTotalTomatoCounts } from '../api/tomato';

export default {
    name: 'TomatoTimer',
    data() {
        return {
            isWorking: true, // Initially, it's work time
            isRunning: false,
            timer: 1500, // 25 minutes in seconds
            intervalId: null,
            timerLengthPreSetting: 1500, // default 25min, user can set it
            todayTomatoCounts: 0,
            totalTomatoCounts: 0,
        };
    },
    methods: {
        startTimer() {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
		this.timer = apiCalcLeftTimer()
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    const timeType = this.isWorking ? "劳动时间" : "安逸时间"
                    this.isWorking = !this.isWorking;
                    this.timer = this.isWorking ? this.timerLengthPreSetting : 300; // Work time: 25 minutes, Break time: 5 minutes
                    apiFinishTomato().then(res => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: "success",
                                message: res.data.msg
                            });
                            apiGetTodayTomatoCounts().then(res => {
                                this.todayTomatoCounts = res.data.obj;
                            })
                            apiGetTotalTomatoCounts().then(res => {
                                this.totalTomatoCounts = res.data.obj;
                            })
                        }
                    })
                    const currentTime = new Date();
                    const hour = currentTime.getHours();
                    const min = currentTime.getMinutes();
                    const millistone = `${timeType}结束于${hour}:${min}`
                    if ("Notification" in window) {
                        // Request permission to show notifications
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                // Create a notification
                                new Notification("🍅番茄时间到啦！", {
                                    body: millistone
                                });
                            } else if (permission === "denied") {
                                // 用户拒绝了通知权限，提供反馈
                                console.log("用户拒绝了通知权限");
                            } else if (permission === "default") {
                                // 用户关闭了通知权限的请求，提供反馈并提示用户手动开启
                                console.log("通知权限请求被关闭");
                            }
                        });
                    } else {
                        console.log("no notifycation in window")
                    }
                }
            }, 1000);
        },
        stopTimer() {
            this.isRunning = false;
            clearInterval(this.intervalId);
        },
        resetTimer() {
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.isWorking = true;
            this.timer = this.timerLengthPreSetting;
        },
        initPage() {
            apiGetTodayTomatoCounts().then(res => {
                this.todayTomatoCounts = res.data.obj;
            })
            apiGetTotalTomatoCounts().then(res => {
                this.totalTomatoCounts = res.data.obj;
            })
        }
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        },
    },
    mounted() {
        console.log("tomato timer mounted")
        this.initPage()
    }
};
</script>

<style>
.timer-text {
    /* 例子：调整文本样式 */
    font-size: 108px;
    /* 字体大小 */
    font-weight: bold;
    /* 字体粗细 */
    color: #ff5733;
    /* 文本颜色（可以使用任何颜色值） */
    text-align: center;
    /* 文本水平居中对齐 */
}
</style>
/*
# i think a better way to setup a tomato timer, using redis

redis:userName:tomato:newest: 2023-12-19 19:56

## what is my pain for now? why is such solution?

javascript.setInterval work not well when the tab was not active
and my vue version is 2, not sure of my js version, but anyway, I cant use Worker in js, which is a good solution for background task

so use redis to store a deadline/end-time, then when the gww tab is active, we can check the tomato from redis. 
but here is another problem: we cant notify user immediately.so I search for websocket tech.

then I think: notification is not that necessary. Since we cant notify on mobile App anyway, so let's just skip notification for now. users will leave gww app anyway, cause she/he is focus on the task.
*/
