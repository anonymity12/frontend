<template>
    <div>
        <el-card>
            <span class="demonstration">本月卡片</span>
            <el-image :src="src"></el-image>
        </el-card>
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