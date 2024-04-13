<template>
    <div id="stars-container">
        <el-button type="primary" icon="el-icon-plus"></el-button>
        <div class="all-stars">
            <div v-for="star in stars" :key="star.createTime">
                <img src="../assets/starSmile.jpg" alt="星星图" style="width: 60px; height: 60px;">
            </div>
        </div>
        <div class="botton-divider"/>
    </div>
</template>

<script>
export default {
    name: "StarsArea",
    data() {
        return {
            stars: [
                {
                    createTime: '2024-04-12',
                    content: 'stay happy',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay foolish',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay real',
                },
                {
                    createTime: '2024-04-12',
                    content: 'stay happy',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay foolish',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay real',
                },
                {
                    createTime: '2024-04-12',
                    content: 'stay happy',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay foolish',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay real',
                },
                {
                    createTime: '2024-04-12',
                    content: 'stay happy',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay foolish',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay real',
                },
                {
                    createTime: '2024-04-12',
                    content: 'stay happy',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay foolish',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay real',
                },
                {
                    createTime: '2024-04-12',
                    content: 'stay happy',
                },
                {
                    createTime: '2024-04-13',
                    content: 'stay foolish',
                },
                
            ]
        }
    }
}
</script>

<style>
.all-stars {
    display: flex;
    flex-wrap: wrap;
}
.botton-divider {
    height: 80px;
}
</style>