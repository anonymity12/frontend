<template>
    <div class="card-square">
        <el-row>
            <el-col :span="12">
                <!-- 左侧列 -->
                <div v-for="(card, index) in leftCards" :key="index" class="card">
                    <!-- 卡片内容 -->
                    <img :src="card.imageUrl" alt="Photo">
                    <div class="card-info">
                        <p>{{ card.desc }}</p>
                        <p>作者: {{ card.owner }}</p>
                        <p>价格: {{ card.finalPrice }}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <!-- 右侧列 -->
                <div v-for="(card, index) in rightCards" :key="index" class="card">
                    <!-- 卡片内容 -->
                    <img :src="card.imageUrl" alt="Photo">
                    <div class="card-info">
                        <p>{{ card.desc }}</p>
                        <p>作者: {{ card.owner }}</p>
                        <p>价格: {{ card.finalPrice }}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import apiGetCardSquareDisplay from '../api/card'
export default {
    data() {
        return {
            cards: [
                
            ]
        };
    },
    computed: {
        // 将相片数据拆分成左右两列
        leftCards() {
            return this.cards.slice(0, Math.ceil(this.cards.length / 2));
        },
        rightCards() {
            return this.cards.slice(Math.ceil(this.cards.length / 2));
        }
    },
    methods: {
        getAllCardsOnSquare() {
            apiGetCardSquareDisplay().then(res => {
                this.cards = res.data.obj
            })
        },
    },
    mounted() {
        this.getAllCardsOnSquare()
    }
};
</script>

<style>
.card-square {
    margin: 20px;
}

.card {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.card img {
    max-width: 100%;
    height: auto;
}

.card-info {
    margin-top: 10px;
}
</style>
