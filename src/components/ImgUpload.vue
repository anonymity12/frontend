<template>
  <el-upload
    class="img-upload"
    ref="upload"
    action=""
    list-type="picture-card"
    with-credentials
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :http-request="uploadImage">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过2MB</div>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
    </div>
  </el-upload>
</template>

<script>
import { uploadImageToServer } from "@/api/user"
import { compression } from "@/utils/compression"
  export default {
    name: 'ImgUpload',
    data () {
      return {
        fileList: [],
        api_endpoint: "http://101.43.166.211:8081/api/sixlog/covers",
        url: ''
      }
    },
    methods: {
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
                      message: `服务器比较穷😭，当前限制选择 1 个图片`
                      })
      },
      beforeRemove (file, fileList) {
        return this.$message(`确定移除 ${file.name}？`)
      },
      handleSuccess (response) {
        this.url = response
        console.log("img uploaded to" , this.url)
        this.$emit('onUpload')
        this.$message('图片已保存😊')
      },
      handleError(response) {
        console.log("err: ", response)
      },
      clear () {
        this.$refs.upload.clearFiles()
      },
      uploadImage(params) {
        var that = this,
        file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf('image') != -1
        console.log("file is ", file)
        if (!isImage) {
          alert("请选择图片文件");
          that.$refs.upload.uploadFiles=[];
          return;
        }
        var isLt3M = file.size / 1024 / 1024 < 3;
        console.log("original file size: ", file.size)

        var transferToFile = async(blobFile, fileName, fileType) => {
          return new window.File([blobFile], fileName, {type: fileType})
        }

        if (!isLt3M) {
          // 图片大小不能超过3M，现在超了，需要压缩
          console.log("need compression")
          compression(file, function(resp) {
            console.log("use callback receiver for resp: ", resp.size)
            let newFileAsync = transferToFile(resp, file.name, "image/jpeg")
            newFileAsync.then((res) => {
              file = res
              console.log("inside: after async: new file size: ", file.size)
              var formData = new FormData();
              formData.append("file", file)
              console.log("before img send, formData: ", formData)
              uploadImageToServer(formData).then((res)=>{
                that.url = res.data
                that.$emit('onUpload')
                that.$message('上传成功')
              })
            })
          })
        }
        return // delete this line later
      }
    }
  }
</script>

<style scoped>
  .img-upload {
    /* height: 200px; */
  }
</style>
