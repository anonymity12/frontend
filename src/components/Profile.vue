<template>
    <div>
        <div class="container">
            <el-form style="width: 100%" v-model="currentUser" ref="dataForm">
                <el-form-item prop="userface">
                    <el-avatar 
                        style="color: #222; margin-top: 20px"
                        :src="currentUser.userface"
                        :size="150">
                    </el-avatar>
                </el-form-item>
                <!-- <el-form-item>
                    <el-upload
                        class="img-upload"
                        ref="upload"
                        action=""
                        with-credentials
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :http-request="uploadHeader"
                        :disabled="widgetDisable">
                        <el-button size="small" type="primary">点击上传新头像</el-button>
                    </el-upload>
                </el-form-item> -->
                <p class="user-info" style="font-size: 26px;font-weight: bold;">{{ currentUser.name }}</p>
                <span class="user-info">{{ currentUser.intro }}</span>
                <p class="user-info" style="font-size: 10px;width: 100%;float: right;">{{ currentUser.birthday }}</p>

                <div class="user-info-footer"></div>
                <ul class="menu">
                    <li class="menu-item" @click="gotoSport">运动打卡</li>
                    <li class="menu-item">血压记录(还没做）</li>
                    <li class="menu-item" @click="gotoSleep">睡觉打卡</li>
                    <li class="menu-item" @click="gotoDabian">大便打卡</li>
                    <li class="menu-item" @click="gotoSixLog">朋友圈</li>
                    <li class="menu-item">设置</li>
                </ul>
            </el-form>
            <!-- <el-button @click="enterEditStatus()">{{ buttonText }}</el-button> -->
        </div>
        <div style="height: 40px;">
        </div>
    </div>
</template>

<script>
import { apiGetUserInfo } from "@/api/user"
import { apiUpdateUserInfo } from "@/api/user"
import { uploadImageToServer } from "@/api/user"

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
                birthday: "1994-01-22"
            },
            buttonText: '编辑我的信息',
        }
    },
    methods: {
        fetchUserInfo() {
            apiGetUserInfo().then(res => {
                console.log("profile :get : res:", res)
                this.currentUser = res.data.obj
            })
        },
        enterEditStatus() {
            // it was previously disabled, now false disable
            if (this.widgetDisable == true) {
                // want to update
                this.widgetDisable = false
                this.buttonText = '确定更新我的信息'
            } else {
                // want to submit
                apiUpdateUserInfo(this.currentUser).then(res => {
                    console.log("after api update user, res: ", res)
                    if (res.data.status == 200) {
                        // backend will give us user's new profile, so we set it in localStorage
                        this.$store.commit('SET_USER', res.data.obj);
                        // ok 
                        this.$message({
                            type: "success",
                            message: "更新我的信息完成"
                        })
                        this.widgetDisable = true
                        this.buttonText = '编辑我的信息'
                        this.fetchUserInfo()
                    } else {
                        this.$message({
                            type: "warning",
                            message: "更新我的信息失败"
                        })
                    }
                })
            }
            
        },
        handleRemove (file, fileList) {
            console.log(file, fileList)
        },
        handlePreview (file) {
            console.log(file)
            // 此处的 file 是整个文件
            // console.log(file.response)
        },
        handleExceed (files, fileList) {
            this.$message({type: "warning",
                        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
                        })
        },
        beforeRemove (file, fileList) {
            return this.$message(`确定移除 ${file.name}？`)
        },
        handleSuccess (response) {
            this.url = response
            console.log("img uploaded to" , this.url)
            this.$emit('onUpload')
            this.$message('上传成功')
        },
        handleError(response) {
            console.log("err: ", response)
        },
        clear () {
            this.$refs.upload.clearFiles()
        },
        uploadHeader(params) {
            var that = this,
            file = params.file,
            fileType = file.type,
            isImage = fileType.indexOf('image') != -1,
            file_url = that.$refs.upload.uploadFiles[0].url;
            console.log("file is ", file)
            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                alert("图片大小不能超过2M");
                that.$refs.upload.uploadFiles=[];
                return;
            }
            if (!isImage) {
                alert("请选择图片文件");
                that.$refs.upload.uploadFiles=[];
                return;
            }
            if (isImage) {
            console.log("ready to upload header")
            var formData = new FormData();
            formData.append("file", file)
            uploadImageToServer(formData).then((res)=>{
                console.log("server resp: ", res)
                /*
                config:Object
                data:"http://101.43.166.211:8081/api/img/offj5o.jpg"
                headers:Object
                request:XMLHttpRequest
                status:200
                statusText:""
                */
                this.currentUser.userface = res.data
                that.$emit('onUpload')
                that.$message('上传成功')
            })
            
            }
        },
        gotoSixLog() {
            this.$router.push("/sixlog")
        },
        gotoDabian() {
            this.$router.push("/shitrecord")
        },
        gotoSleep() {
            this.$router.push("/sleeprecord")
        },
        gotoSport() {
            this.$router.push("/sportcompetition")
        },
    },
    mounted() {
        apiGetUserInfo().then(res => {
                console.log("profile :get : res:", res)
                this.currentUser = res.data.obj
            })
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
.user-info {
    margin: 10px;
    padding: 1px;
    width: 90%;
    border: none;
    font-family: 'MaShanZheng-Regular', sans-serif;
}
.user-info-footer {
    height: 1px;
    margin-bottom: 20px;
}
.menu {
    list-style: none;
    padding: 0;
    display: flex;
    width: 100%;
    flex-direction: column; /* 设置为列排列 */
    justify-content: space-around;
}
.menu-item {
    margin: 10px;
    padding: 5px;
    width: 90%;
    border: none;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    background: linear-gradient(to top, #FFF1CB,#FFFFFF, #FFFFFF, transparent);
}
li::after {
  content: ">";
  float: right;
  font-size: 20px;
  font-weight: bold;
}
</style>