<template>
  <div>
  <el-upload
    class="img-upload"
    ref="upload"
    action=""
    v-loading="loading"
    list-type="picture-card"
    with-credentials
    :on-preview="handlePreview"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    multiple
    :limit="2"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :http-request="uploadImage">
    <i slot="default" :class="iconClass"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible" style="width: 100%; height: 100%;" append-to-body fullscreen>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
import { uploadImageToServer } from "@/api/user"
import { compression } from "@/utils/compression"
  export default {
    name: 'ImgUpload',
    data () {
      return {
        fileList: [],
        url: '',
        loading: false,
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.$refs.upload.clearFiles()
      },
      handlePreview (file) {
        console.log(file)
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
        let isHeic = fileType.indexOf('heic') != -1
        // 2023-02-20 08:52:01 iPhone has heif, which is permit to upload, and Sister say it's fine
        //                     when I send heif to Mac, it become heic, which might no ok, so heic is not permitted
        console.log("file is ", file)
        if (!isImage) {
          alert("请选择图片文件");
          that.$refs.upload.uploadFiles=[];
          return;
        }
        that.loading = true
        console.log("start compression, upload")
        var isLt1M = file.size / 1024 / 1024 < 1;
        console.log("original file: ", file)

        var transferToFile = async(blobFile, fileName, fileType) => {
          return new window.File([blobFile], fileName, {type: fileType})
        }
        if (isHeic) {
          this.$message("苹果的heic格式照片现在有问题啊")
          return 
          var formData = new FormData();
          formData.append("file", file)
          console.log("it's heic send, formData: ", formData)
          uploadImageToServer(formData).then((res)=>{
            that.url = res.data
            that.fileList.splice(0,1,{"name": "randName","url":res.data})
            that.$emit('onUpload')
            that.$message('上传成功')
            that.loading = false
          })
          return 
        }

        if (!isLt1M) {
          // 图片大小不能超过1M，现在超了，需要压缩
          console.log("need compression")
          compression(file, function(resp) {
            console.log("use callback receiver for resp obj: ", resp)
            let newFileAsync = transferToFile(resp, "imageJsConverted.jpeg", "image/jpeg")
            newFileAsync.then((res) => {
              file = res
              console.log("inside: after async: new file obj: ", file)
              var formData = new FormData();
              formData.append("file", file)
              console.log("before img send, formData: ", formData)
              uploadImageToServer(formData).then((res)=>{
                that.url = res.data
                that.fileList.splice(0,1,{"name": "randName","url":res.data})
                that.$emit('onUpload')
                that.$message('上传大图片成功')
                that.loading = false
              })
            })
          })
        } else {
          var formData = new FormData();
          formData.append("file", file)
          console.log("small img send, formData: ", formData)
          uploadImageToServer(formData).then((res)=>{
            that.url = res.data
            that.fileList.splice(0,1,{"name": "randName","url":res.data})
            that.$emit('onUpload')
            that.$message('上传小图片成功')
            that.loading = false
          })
        }
      }
    },
    computed: {
      // 计算属性，根据fileList的长度来确定图标
      iconClass() {
        if (this.fileList.length >= 1) {
          return 'el-icon-refresh'; // 如果文件数大于等于1，显示刷新图标
        } else {
          return 'el-icon-plus'; // 否则显示加号图标
        }
      }
    }
  }
</script>

<style scoped>
  .img-upload {
    /* height: 200px; */
  }
</style>
