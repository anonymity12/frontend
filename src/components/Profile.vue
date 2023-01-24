<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="18">
            <el-form v-model="currentUser" ref="dataForm">
                <el-form-item prop="userface">
                    <el-avatar 
                        style="color: #222; float: left; margin-top: 20px"
                        :src="currentUser.userface"
                        :size="150">
                    </el-avatar>
                </el-form-item>
                <el-form-item>
                    <el-button 
                    @click="changeUserface()" 
                    :disabled="widgetDisable"
                    size="small"
                    >更新头像</el-button>
                </el-form-item>
                <el-form-item label="名字" prop="name">
                    <el-input v-model="currentUser.name" :disabled="widgetDisable"></el-input>
                </el-form-item>
                <el-form-item label="登陆ID" prop="cosmosId">
                    <el-input v-model="currentUser.cosmosId" :disabled="widgetDisable"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="currentUser.password" :disabled="widgetDisable" ></el-input>
                </el-form-item>
                <el-form-item label="自我定位" prop="intro">
                    <el-input v-model="currentUser.intro" :disabled="widgetDisable"></el-input>
                </el-form-item>
                <el-form-item prop="id">
                    <label>用户数据库id： {{ currentUser.id }}</label>
                </el-form-item>
            </el-form>
            <el-button @click="enterEditStatus()">编辑</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { apiGetUserInfo } from "@/api/user"
import { apiUpdateUserInfo } from "@/api/user"
export default {
    name: 'Profile',
    data() {
        return {
            widgetDisable: true,
            currentUser: {
                id: 1,
                userface: "",
                name: "noname",
                cosmosId: "9909",
                password: "12333",
                intro: "无定位的我",
            },
        }
    },
    methods: {
        fetchUserInfo() {
            var username = this.$store.state.user.name
            apiGetUserInfo(username).then(res => {
                console.log("profile :get : res:", res)
            })
        },
        enterEditStatus() {
            this.widgetDisable = false
        },
        changeUserface() {
            console.log("change userface")
        }
    }
}
</script>