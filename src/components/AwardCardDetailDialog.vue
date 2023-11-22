<template>
    <div>
        <el-dialog title="卡片细节" :visible.sync="innerDialog.show">
            <img :src="cardModel.imageUrl" alt="图片" style="max-width: 100%;" />
            <p><strong>名称:</strong> {{ cardModel.name }}</p>
            <p><strong>描述:</strong> {{ cardModel.desc }}</p>
            <p><strong>售价:</strong> {{ cardModel.finalPrice }}</p>
            <div slot="footer">
                <el-button @click="closeDialog">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "AwardCardDetailDialog",
    props: {
        innerDialog: Object,
        cardModel: Object
    },
    methods: {
        closeDialog() {
            this.innerDialog.show = false
        }
    }
}
</script>

<style>

</style>