<template>
    <div>
        <el-dialog title="奖励新星星" :visible.sync="dialogStatus.show" width="85%">
            <el-input placeholder="我深蹲了10个 / 我读了5分钟书" v-model="awardReason">
                <el-button type="text" slot="append" icon="el-icon-s-promotion" style="color: green;" @click=recordOneStar></el-button>
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
            awardReason: ''
        }
    },
    methods: {
        recordOneStar() {
            // construct a starObj
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
                if (res.data.status == 200) {
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                    // todo emit a signal to let StarArea to refresh
                    this.$emit("recordDone");
                } else {
                    this.$message({
                        type: "warning",
                        message: res.data.msg
                    })
                }
            })
        }
    }
}
</script>