<template>
    <div id="stars-container">
        <el-progress :percentage="56"></el-progress>
        <el-row class="progress-star">
            <p>宇宙时间：2056</p><p>COUNT：246</p>
            <el-progress type="circle" :width="40" :stroke-width="3" :percentage="30" color="#32A937"></el-progress>
            <el-progress type="circle" :width="40" :stroke-width="3" :percentage="70" color="#f56c6c"></el-progress>
            <el-progress type="circle" :width="40" :stroke-width="3" :percentage="80" color="#EFCF75"></el-progress>
            <el-button type="primary" icon="el-icon-plus"></el-button>
        </el-row>
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
.progress-star {
    display: flex;
    justify-content: right;
}
</style>