<template>
    <div class="bottom_input">
      <el-row style="margin: 8px;">
        <el-col :span="24">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          v-model="sixlog.articleTitle"
          style="margin: 0px 0px;font-size: 20px;"
          placeholder="现在的想法是..."
          ref="mytextarea"
          >
        </el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-row type="flex" justify="start">
          <el-upload
            class="img-upload"
            ref="upload"
            action=""
            list-type="picture-card"
            with-credentials
            multiple
            :limit="2"
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
        </el-row>
        <el-row type="flex" justify="end" >
          <el-col :span="4">
            <el-select size="small" v-model="value" placeholder="#标签" style="width: 60px;margin-top: 5px;" @change="handleSelectChange">
              <template slot="prefix">
                <i class="el-icon-price-tag" style="font-size: 20px; margin-top: 5px;"></i>
              </template>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            
          </el-col>
          <el-col :span="12" >
          </el-col>
          <el-col :span="8" >
            <el-button @click="sendLog" type="warning" icon="el-icon-s-promotion" circle></el-button>
          </el-col>
        </el-row>
      </el-row>
      
      <el-dialog :visible.sync="dialogVisible" style="width: 100%; height: 100%;" append-to-body fullscreen>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      
    </div>
</template>
<script>
import { uploadImageToServer } from "@/api/user"
import { compression } from "@/utils/compression"
export default({
  name: 'SixLogBottomInput',
  data() {
    return {
      sixlog: {
          articleAbstract: "",
          articleCover: "",
          articleTitle: ""
      },
      imagesUrl: [],
      text: "sld",
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      options: [
        {
          value: '童年乐趣',
          label: '童年乐趣'
        }, {
          value: '青年迷思',
          label: '青年迷思'
        }, {
          value: '中年感悟',
          label: '中年感悟'
        }, {
          value: '老年展望',
          label: '老年展望'
        }, {
          value: '游历记趣',
          label: '游历记趣'
        }, {
          value: '坎坷记愁',
          label: '坎坷记愁'
        }],
      value: '',
    }
  },
  methods: {
    removeImage(index) {
        this.imagesUrl.splice(index, 1);
    },
    handleSelectChange(selectedValue) {
      this.addTag(selectedValue); // 当选择改变时，调用addTag函数
    },
    addTag(tag) {
        this.$refs.mytextarea.focus(); 
        const cursorPos = this.$refs.mytextarea.selectionStart;
        const textAreaText = this.sixlog.articleTitle;
        const tagText = ` #${tag} `; 
        this.sixlog.articleTitle = textAreaText.substring(0, cursorPos) + tagText
    },
    addPic() {
        this.images.push("https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png")
    },
    sendLog() {
        this.images.push("https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png")
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList.splice(0,1)
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
          that.alreadyUploadedOnePic = that.fileList.length >= 1;
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
              that.alreadyUploadedOnePic = that.fileList.length >= 1;
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
          that.alreadyUploadedOnePic = that.fileList.length >= 1;
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
})
</script>
<style scoped>
.bottom_input {
    position: fixed;
    bottom: 0;
    left: 6%; /* 设置左边距为10%，使元素从底部居中 */
    width: 88%; /* 宽度为80% */
    background-color: #FFF;
    box-shadow: 0px 0px 5px 5px #fffff8;
}
.bottom_input>>>.el-textarea__inner {
    border: 0;
    resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}


.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 为图片之间添加间隔 */
}
.image-preview img {
  float: left; /* 使元素靠左浮动 */
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.image-container {
  position: relative;
  display: inline-block; /* 或者使用 flex; */
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: bold;
  background-color: #FFF1CB; /* 删除按钮的背景颜色 */
  color: blue;
  border-radius: 50%;
  user-select: none; /* 防止文本被选中 */
}

</style>