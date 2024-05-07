<template>
    <div>
        <el-dialog title="星星细节" :visible.sync="dialogStatus.show" width="100%">
            <img :src="starModel.imageUrl" alt="星图" style="width: 60px; height: 60px;" />
            <p><strong>缘由：</strong> {{ starModel.reason }} </p>
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