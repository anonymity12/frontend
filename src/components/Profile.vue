<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :span="18">
            <el-form v-model="currentUser" ref="dataForm">
                <el-form-item prop="userface">
                    <el-avatar 
                        style="color: #222; margin-top: 20px"
                        :src="currentUser.userface"
                        :size="150">
                    </el-avatar>
                </el-form-item>
                <el-form-item>
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
                <el-form-item label="生命起始日" prop="birthday">
                    <el-date-picker
                    v-model="currentUser.birthday"
                    align="right"
                    type="date"
                    placeholder="选择出生日期"
                    >
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item label="自我定位" prop="intro">
                    <el-input v-model="currentUser.intro" :disabled="widgetDisable"></el-input>
                </el-form-item>
                <el-form-item label="预期寿命">
                    <label> 100年 </label>
                </el-form-item>
                <el-form-item prop="id">
                    <label>用户数据库id: {{ currentUser.id }}</label>
                </el-form-item>
            </el-form>
            <el-button @click="enterEditStatus()">{{ buttonText }}</el-button>
            </el-col>
        </el-row>

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
                        this.$store.commit('SET_USER_COSMOS_ID', this.currentUser.cosmosId);
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
        }
    },
    mounted() {
        apiGetUserInfo().then(res => {
                console.log("profile :get : res:", res)
                this.currentUser = res.data.obj
            })
    }
}
</script>