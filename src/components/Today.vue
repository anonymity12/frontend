<template>
    <div id="today-container">
        <el-row>
            <h1>{{ this.currentUser.name }}</h1>
        </el-row>
        <el-row>
            <el-avatar 
                style="color: #222; margin-top: 20px"
                :src="this.currentUser.userface"
                :size="150">
            </el-avatar>
        </el-row>
        <el-row class="count-card">
            <p>📅已经在地球上待了天数</p>
            <el-row>
                <h1>
                    <span v-for="(digit, index) in String(userLifePassed)" 
                        :key="index" 
                        :class="`digit digit-${index}`">
                        {{ digit }}
                    </span>
                </h1>
            </el-row>
        </el-row>
        <el-row class="feeling-card">
                <h3><span class="heart-icon">❤️</span> 记录心情</h3>
                <p>无论喜悦还是悲伤，让我们以坚强和积极拥抱每一天。</p>
                <el-button type="primary" class="add-btn" @click="gotoSixLog" >添加</el-button>
        </el-row>
        
        <el-row class="weather-card">
            <h3>🌥️ 天气：多云，{{ temperature }}°C</h3>
            <p>出行建议：厚外套、围巾。</p>
            <p>今天宜：适合室内活动，如购物、咖啡馆。</p>
        </el-row>
        
    </div>
</template>

<script>
import { getLifeIndicator } from '@/api/user'
import { apiGetUserInfo } from '@/api/user'
export default {
    data() {
        return {
            temperature: 9.88,
            userLifePassed: 0,
            currentUser: {
                id: 1,
                userface: "",
                name: "noname",
                cosmosId: "9909",
                password: "12333",
                intro: "i am a good boy",
                birthday: "1994-01-22"
            },
        }
    },
    methods: {
        callGetLifeIndicator() {
            getLifeIndicator().then(resp => {
                this.userLifePassed = resp.data.obj.dayPassed
            })
        },
        gotoSixLog() {
            this.$router.push("/sixlog")
        },
        fetchUserInfo() {
            apiGetUserInfo().then(res => {
                this.currentUser = res.data.obj
            })
        },
    },
    mounted() {
        this.callGetLifeIndicator()
        this.fetchUserInfo()
    }
}
</script>

<style scoped>
.count-card, .feeling-card, .weather-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin: 10px 0;
    width: 100%;
}

.heart-icon {
    color: #ff4949;
}

.add-btn {
    width: 100%;
    margin-top: 15px;
    border-radius: 20px;
}

#today-container {
    padding: 20px;
}

h3 {
    margin-top: 0;
}

/* 为数字添加不同颜色 */
.digit {
    display: inline-block;
}
.digit-0 { color: #FF6B6B; }
.digit-1 { color: #4ECDC4; }
.digit-2 { color: #45B7D1; }
.digit-3 { color: #26b80c; }
.digit-4 { color: #120f03; }
</style>
