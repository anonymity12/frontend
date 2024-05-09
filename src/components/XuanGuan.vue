<template>
    <div>
        <el-card style="background-color: #FFF1CB;">
            <div slot="header" class="clearfix">
                <span style="float: left;font-size: large;
                    font-weight: bold;">
                    更多功能
                </span>
            </div>
            <div type="flex">
                <el-button type="danger" round @click="handleClick(4)" class="profile-span-text">
                    🔓重新登陆
                </el-button>
                <el-button type="primary" round @click="handleClick(8)" class="profile-span-text">
                    蓝天拉屎房
                </el-button>
                <el-button type="warning" round @click="handleClick(9)" class="profile-span-text">
                    睡觉莲花楼
                </el-button>
                <el-button type="warning" round @click="handleClick(1)" class="profile-span-text">
                    📓浮生六记
                </el-button>
                <el-button type="primary" round @click="handleClick(3)" class="profile-span-text">
                    🥇查看排名
                </el-button>
                <el-button type="warning" size="small" round @click="handleClick(2)" class="profile-span-text">
                    {{ this.musicState ? '暂停音乐' : '播放音乐' }}
                </el-button>
                <el-button type="warning" round @click="handleClick(7)" class="profile-span-text">
                    任务面板
                </el-button>
                <el-button type="primary" round @click="handleClick(5)" class="profile-span-text">
                    管理惯例
                </el-button>
                <el-button type="primary" round @click="handleClick(6)" class="profile-span-text">
                    番茄钟
                </el-button>
            </div>
        </el-card>
        <el-row style="margin: 8px;" type="flex" justify="space-between" align="middle">
            <span class="profile-span-text">不断更新的乖娃娃应用</span>
            <span>
                <audio controls loop="loop" id="bg-music" style="display: none; height: 0dp">
                    <source src="http://101.43.166.211/2awa.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </span>
            <span class="profile-span-text">当前音乐清单为：<el-tag effect="plain" size="mini">2awa.mp3</el-tag>, 由 <el-tag
                    size="mini">通通</el-tag> 创建</span>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'ExtraArea',
    data() {
        return {
            musicState: false
        }
    },
    methods: {
        handleClick(pos) {
            switch (pos) {
                case 1:
                    this.$router.push({ path: '/sixlog' })
                    break
                case 2:
                    var audio = document.getElementById("bg-music")
                    if (this.musicState == false) {
                        audio.play()
                        this.musicState = true
                    } else {
                        audio.pause()
                        this.musicState = false
                    }
                    break
                case 3:
                    this.$router.push({ path: '/ranks' })
                    break
                case 4:
                    this.$store.commit("REMOVE_INFO")
                    this.$router.push({ path: '/login' })
                    break
                case 5:
                    this.$router.push({ path: '/routine' })
                    break
                case 6:
                    this.$router.push({ path: '/tomato' })
                    break
                case 8:
                    this.$router.push({ path: '/shitrecord' })
                    break
                case 9:
                    this.$router.push({ path: '/sleeprecord' })
                    break
                default:
                    break
            }
        }
    },
}
</script>
<style></style>