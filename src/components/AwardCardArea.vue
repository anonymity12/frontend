<template>
    <div>
        <el-card  style="width: 100%;">
            <div @click="openCardDetail()">
            <el-row class="glow-effect" style="padding-top: 2%; padding-bottom: 2%;">
                <img style="width: 320px; height: 320px; object-fit: contain;" :src="mainCard.imageUrl" />
            </el-row>
            </div>
        </el-card>
        <AwardCardDetailDialog :innerDialog="dialogCardDetail" :cardModel="mainCard"></AwardCardDetailDialog>
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
}

.glow-effect::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 5px green;
    animation: glow-animation 5s ease-in-out infinite;
}

@keyframes glow-animation {
    0% {
        box-shadow: 0 0 10px 5px green;
    }

    50% {
        box-shadow: 0 0 10px 10px green;
    }

    100% {
        box-shadow: 0 0 10px 15px green;
    }
}
</style>