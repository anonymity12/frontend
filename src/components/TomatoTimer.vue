<template>
    <div>
        <h1>Pomodoro Timer</h1>
        <p v-if="isWorking">Work Time</p>
        <p v-else>Break Time</p>
        <div>{{ timer }}</div>
        <button @click="startTimer" v-if="!isRunning">Start</button>
        <button @click="stopTimer" v-else>Stop</button>
        <button @click="resetTimer">Reset</button>
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
        };
    },
    methods: {
        startTimer() {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    this.isWorking = !this.isWorking;
                    this.timer = this.isWorking ? 15 : 3; // Work time: 25 minutes, Break time: 5 minutes
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
            this.timer = 15;
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
/* Add your CSS styles here */
</style>
