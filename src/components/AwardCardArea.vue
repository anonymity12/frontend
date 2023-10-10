<template>
    <div class="glow-effect" >
        <el-card style="width: 100%; height: 468px;">
            <el-row>
                <span class="glow-effect" >本周卡片</span>
            </el-row>
            <el-row style="padding-top: 2%; padding-bottom: 2%;">
                <img style="width: 320px; height: 320px; object-fit: contain;" :src="mainCard.imageUrl"/>
            </el-row>
            <el-row>
                <span class="glow-effect" style="float: left; display: block;">{{ mainCard.name }}</span>
            </el-row>
            <el-row>
                <p class="glow-effect" style="float: left;">价值：¥{{ mainCard.finalPrice }}</p>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { apiGetMainCard } from '../api/card';
export default {
    name: 'AwardCardArea',
    data() {
        return {
            mainCard: {
                imageUrl: 'https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png',
                name: "五星檀健次",
                finalPrice: 100
            },
        }
    },
    methods: {
        getMyWeekCard: function () {
            /*
            apiGetMyPrimaryCard().then(res => {
                this.cardPicSrc = res.data.cardPicSrc
                this.cardTitle = res.data.cardTitle
                this.cardValue = res.data.cardValue
            })
            */
        },
        switchMyPrimaryCard: function() {
            /*
            apiSwitchMyPrimaryCard(newCardId).then()
            */
        }
    },
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