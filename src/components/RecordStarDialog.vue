<template>
    <div>
        <el-dialog title="奖励新星星" :visible.sync="dialogStatus.show"
                :before-close="updateOptions" width="85%">
            <div class="scroll-container">
            <div class="scroll-content">
                <el-tag
                    class="record-star-tags"
                    v-for="(suggestion, index) in randomSuggestions" 
                    :key="index" 
                    :closable="false" 
                    @click="updateInput(suggestion)">
                    {{ suggestion }}
                </el-tag>
            </div>
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
            suggestions: ['我写完英语作业了', '我写完数学作业了', '我写完语文作业了',
                '我跳舞了', '我买菜了','我运动了', '我做饭了', '我洗碗了','我扫地了','我拖厨房的地了',
                '我学单词5个了', '我为了减肥而跳绳100个了',
                '我读书了','我洗澡了', '我刷牙了', '我吃药了', '我量血压了', '我按摩了','我深蹲了',
                '我抬起胳膊治疗肩周炎了','我工作一小时后走路5分钟了','我把读书的体会分享给别人了',
                '我问爸爸今天工作累不累了','我问妈妈今天心情好不好了','我从爷爷手里抢走烟，让他少抽烟了','我给奶奶拍了一个好看的照片',],
            randomSuggestions: [],
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
        getRandomSuggestions() {
            const totalSuggestions = this.suggestions.length;
            let selectedSuggestions = [];

            while (selectedSuggestions.length < 10) {
                const randomIndex = Math.floor(Math.random() * totalSuggestions);
                if (!selectedSuggestions.includes(this.suggestions[randomIndex])) {
                    selectedSuggestions.push(this.suggestions[randomIndex]);
                }
            }

            return selectedSuggestions.slice(0, 10);
        },
        updateOptions(done) {
            this.awardReason = "";
            this.randomSuggestions = this.getRandomSuggestions();
            done();
        },
    },
    mounted() {
        this.randomSuggestions = this.getRandomSuggestions();
    }
}
</script>

<style>
.record-star-tags {
  margin: 5px;
  font-size: 22px;
}
.scroll-container {
  overflow: hidden;
  position: relative;
  height: 220px; /* 根据需要调整高度 */
}

@keyframes scroll {
  0% { transform: translateX(90%); }
  100% { transform: translateX(-90%); }
}
</style>