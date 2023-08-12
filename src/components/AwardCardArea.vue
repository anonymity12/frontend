<template>
    <div class="glow-effect" >
            <span class="glow-effect" >本月卡片</span>
            <el-image  :src="src"></el-image>
    </div>
</template>

<script>
export default {
    name: 'AwardCardArea',
    data() {
        return {
            src: 'https://img.zcool.cn/community/01109c5de75b1fa801209568d59209.jpg@1280w_1l_2o_100sh.jpg'
        }
    }
}
</script>

<style>
.glow-effect {
    position: relative;
}

.glow-effect::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 5px green;
    animation: glow-animation 2s ease-in-out infinite;
}

@keyframes glow-animation {
    0% {
        box-shadow: 0 0 10px 5px green;
    }

    50% {
        box-shadow: 0 0 20px 10px green;
    }

    100% {
        box-shadow: 0 0 10px 15px green;
    }
}
</style>