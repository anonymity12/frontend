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
        <div v-if="images.length" class="image-preview">
            <div v-for="(image, index) in images" :key="index" class="image-container">
                <img :src="image" alt="Preview" class="preview-image" />
                <span class="close-btn" @click="removeImage(index)">x</span>
            </div>
        </div>
        <el-button @click="addTag('TagA')" type="warning" icon="el-icon-price-tag" circle></el-button>
        <el-button @click="addPic" type="warning" icon="el-icon-picture" circle></el-button>
        <el-button @click="sendLog" type="warning" icon="el-icon-s-promotion" circle></el-button>
      </el-row>
    </div>
</template>
<script>
export default({
  name: 'SixLogBottomInput',
    data() {
        return {
            sixlog: {
                articleAbstract: "",
                articleCover: "",
                articleTitle: ""
            },
            images: ["https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png"],
            text: "sld",
        }
    },
    methods: {
        removeImage(index) {
            // 从数组中移除图片
            this.images.splice(index, 1);
        },
        addTag(tag) {
            this.$refs.mytextarea.focus(); 
            const cursorPos = this.$refs.mytextarea.selectionStart;
            const textAreaText = this.sixlog.articleTitle;
            const tagText = `#${tag} `; 
            this.sixlog.articleTitle = textAreaText.substring(0, cursorPos) + tagText
        },
        addPic() {
            this.images.push("https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png")
        },
        sendLog() {
            this.images.push("https://picgorepo.oss-cn-beijing.aliyuncs.com/2023-08-13-10-47-25.png")
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