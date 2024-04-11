<template>
    <div id="stars-container">
        <el-button size="small"> 加星 </el-button>
        <div id="all-stars">
            <div class="star" v-for="star in stars" :key="star.createTime">
                <img src="../assets/starSmile.jpg" alt="星星图">
            </div>
        </div>
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
            ]
        }
    }
}
</script>