<template>
    <div >
        <el-dialog custom-class="my-dialog" title="这颗星星的档案" :visible.sync="dialogStatus.show" width="80%" height="40%" >
            <img :src="starModel.imageUrl" alt="星图" style="width: 60px; height: 60px;" />
            <p><strong>星语:</strong> {{ starModel.reason }} </p>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ReviewStarDialog',
    props: {
        dialogStatus: Object,
        starModel: Object
    },
    methods: {
        closeDialog() {
            this.dialogStatus.show = false
        }
    }
}
</script>

<style scoped>
.my-dialog {
  background: #FFF1CB; 
}
</style>