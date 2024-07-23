<template>
    <div>
        <el-dialog title="奖励新星星" :visible.sync="dialogStatus.show" width="85%">
            <div >
                <el-tag
                    class="record-star-tags"
                    v-for="(suggestion, index) in suggestions" 
                    :key="index" 
                    :closable="false" 
                    @click="updateInput(suggestion)">
                    {{ suggestion }}
                </el-tag>
            </div>
            <el-input placeholder="我深蹲了10个 / 我读了5分钟书" v-model="awardReason">
                <el-button type="text" slot="append" icon="el-icon-check" style="color: green; font-size: 28px;" v-if="awardReason" @click=recordOneStar></el-button>
            </el-input>
        </el-dialog>
    </div>
</template>

<script>
import { apiRecordOneStar } from "@/api/star"

export default {
    name: 'RecordStarDialog',
    props: {
        dialogStatus: Object
    },
    data() {
        return {
            awardReason: '',
            suggestions: ['我买菜了','我运动了', '我做饭了', '我洗碗了','我扫地了','我读书了3分钟','我洗澡了', '我刷牙了', '我按摩了','我深蹲了','我抬起胳膊了'],
        }
    },
    methods: {
        recordOneStar() {
            const loading = this.$loading({
                lock: true,
                text: '请稍候...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            const currentTime = new Date();
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
                };
            const formattedTime = currentTime.toLocaleString('en-US', options);

            var starObj = {
                starDateTimeString: formattedTime,
                starDescriptionString: this.awardReason
            }
            // then post it to backend
            apiRecordOneStar(starObj).then(res => {
                console.log("apiRecordOneStar return: ", res)
                this.dialogStatus.show = false
                loading.close()
                if (res.data.status == 200) {
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                    this.awardReason = ""
                    this.$emit("recordDone");
                } else {
                    this.$message({
                        type: "warning",
                        message: res.data.msg
                    })
                }
            })
        },
        updateInput(value) {
            this.awardReason = value;
        },
    }
}
</script>

<style>
.record-star-tags {
  margin: 5px;
  font-size: 22px;
}
</style>