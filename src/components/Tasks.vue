<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>解决这些事</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                    操作按钮
                </el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{ '列表内容' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>

</script>

<style>
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
}
</style>