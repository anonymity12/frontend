<template>
  <el-upload
    class="img-upload"
    ref="upload"
    action="http://101.43.166.211:8081/api/sixlog/covers"
    with-credentials
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
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
      }
    }
  }
</script>

<style scoped>
  .img-upload {
    /* height: 200px; */
  }
</style>
