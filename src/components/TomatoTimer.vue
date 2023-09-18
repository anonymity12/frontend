<template>
    <div>
        <h1>🍅我的番茄钟🍅</h1>
        <p v-if="isWorking">劳动时间</p>
        <p v-else>安逸时间</p>
        <el-button type="success" @click="startTimer" v-if="!isRunning">开始番茄钟计时</el-button>
        <el-button type="danger" @click="stopTimer" v-else>停止番茄钟计时</el-button>
        <div class="timer-text">{{ formattedTime }}</div>
        <br>
        <el-input v-model="timerLengthPreSetting" :style="{ width: '100px' }" placeholder="输入你自定义的时间"></el-input>
        <el-button type="info" @click="resetTimer">重新设定番茄钟</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isWorking: true, // Initially, it's work time
            isRunning: false,
            timer: 1500, // 25 minutes in seconds
            intervalId: null,
            timerLengthPreSetting: 1500, // default 25min, user can set it
        };
    },
    methods: {
        startTimer() {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    const timeType = this.isWorking ? "劳动时间" : "安逸时间"
                    this.isWorking = !this.isWorking;
                    this.timer = this.isWorking ? this.timerLengthPreSetting : 300; // Work time: 25 minutes, Break time: 5 minutes
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
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        },
    },
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
}</style>
