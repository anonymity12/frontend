<template>
    <div>
        <el-card  >
            <div @click="openCardDetail()" class="glow-effect">
                <img style="width: 100%; height: 100%; object-fit: contain;" src="../assets/butterFlyStars.jpeg" />
            </div>
        </el-card>
        <!-- <AwardCardDetailDialog :innerDialog="dialogCardDetail" :cardModel="mainCard"></AwardCardDetailDialog> -->
    </div>
</template>

<script>
import { apiGetMyMainCard } from '../api/card';
import AwardCardDetailDialog from './AwardCardDetailDialog.vue';
export default {
    name: 'AwardCardArea',
    data() {
        return {
            mainCard: {
                imageUrl: 'https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png',
                name: "五星檀健次",
                finalPrice: 100,
                desc:"a nice boy"
            },
            dialogCardDetail: {
                show: false
            },
        }
    },
    methods: {
        getMyMainCard () {
            apiGetMyMainCard().then(res => {
                this.mainCard = res.data.obj
            })
        },
        openCardDetail () {
            this.dialogCardDetail.show = true
        },
        
        openMyCardGallery () {
            // navigate to cardGallery todo 2023-10-18 21:49:30
        },
    },
    mounted() {
        this.getMyMainCard()
    },
    components: {
        AwardCardDetailDialog
    }
}
</script>

<style>
.glow-effect {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #FFF1CB;
}

.glow-effect::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 15px #FFF1CB;
    animation: glow-animation 3s ease-in-out infinite;
}

@keyframes glow-animation {
    0% {
        box-shadow: 0 0 10px 10px #FFF1CB;
    }

    50% {
        box-shadow: 0 0 20px 25px #FFF1CB;
    }

    100% {
        box-shadow: 0 0 10px 10px #FFF1CB;
    }
}
</style>
