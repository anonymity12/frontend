<template>
  <div>
    <el-menu
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red">
      <el-menu-item>
        <a style="font-size: xx-large;" @click="goBack">X</a>
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">
        浮生六记
      </span>
    </el-menu>


    <!-- main list for posts: -->
    <div class="main_list"   :class="{ 'blur': showBottomInput }" @click="handleContainerClick">
      <div style="width: 100%; margin-top: 20px;">
        <el-card v-for="article in articles" :key="article.id" style="text-align: left;width: 100%; min-height: 200px; margin-bottom: 6px;">
          <div style="float:left;width:100%;">
            <span style="font-size: 20px">
            <strong>{{article.articleTitle}}</strong>
            </span>
          </div>
          <div style="float:left;width:100%;">
            <el-divider content-position="left">{{article.articleDate | moment}} by {{ article.ownerName }}</el-divider>
          </div>
          <el-image v-if="article.articleCover!=''"
            style="margin:8px 0 0 8px;width:auto;"
            :src="article.articleCover"
            fit="cover">
          </el-image>
          <el-button type="info" size="small" 
                  icon="el-icon-star-off" 
                  @click="handleLikeBtnClicked(article.id)">
                  {{article.likeCounts}} 赞
          </el-button>
        </el-card>
      </div>
      <el-pagination
        background
        layout="total, prev, next"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <el-button class="bottom_button" @click="toggleBottomInput" ref="toggleInputBtn">+</el-button>

    <transition name="slide">
    <SixLogBottomInput v-show="showBottomInput" ref="sixLogBottomInput"/>
    </transition>
  </div>
</template>
<script>
import { getLogs } from "@/api/user"
import { getSixLogTotalAmount } from "@/api/user"
import ImgUpload from './ImgUpload'
import SixLogBottomInput from './SixLogBottomInput'
import { callSendSixLogApi } from "@/api/user"
import { apiLikeASixLog } from "../api/sixlog"
export default({
  name: 'SixLog2',
  data() {
    return {
      articles: [],
      pageSize: 19,
      curPage: 1,
      total: 0,
      keywords: '',
      sixlog: {
        articleAbstract: "",
        articleCover: "",
        articleTitle: ""
      },
      dialogVisible: false,
      showBottomInput: false,
    }
  },
  mounted() {
    this.loadArticles()
    this.loadLogsAmount()
  },
  methods: {
    handleContainerClick(event) {
      if (!this.showBottomInput) {
        console.log("not show input, dismiss this click")
        return;
      }
     console.log("outer clike")
     if (this.$refs.toggleInputBtn.$el.contains(event.target)) {
      console.log("outer click togglebtn")
      return false;
     }
      // 检查点击事件是否来自子组件外部
      if (!this.$refs.sixLogBottomInput || !this.$refs.sixLogBottomInput.$el.contains(event.target)) {
        console.log("ugliy")
        this.showBottomInput = !this.showBottomInput;
      }
    },
    toggleBottomInput() {
      console.log("toggle clieck")
      this.showBottomInput = !this.showBottomInput; // 切换SixLogBottomInput的显示状态
      console.log("now showBottom?:" , this.showBottomInput)
    },
    handleLikeBtnClicked(articleId) {
      var _this = this 
      console.log("ready to like the sixlog: ", articleId)
      const sixLogIdBody = {'sixLogId': articleId}
      apiLikeASixLog(sixLogIdBody)
      getLogs(this.pageSize, this.curPage).then(resp => {
        if (resp && resp.status === 200) {
          _this.articles = resp.data
        }
      })
    },
    dialogCancel() {
      this.dialogVisible = false
      this.sixlog.articleCover = ""
      this.articleAbstract = ""
    },
    // these methods require backend to support pagination api
    loadArticles() {
      var _this = this 
      getLogs(this.pageSize, 1).then(resp => {
        console.log("api/sixlog return: ", resp)
        if (resp && resp.status === 200) {
          _this.articles = resp.data
        }
      })
    },
    loadLogsAmount() {
      var _this = this 
      getSixLogTotalAmount().then(resp => {
        console.log("/api/sixlog/getTotalAmount return: ", resp)
        if (resp && resp.status === 200) {
          _this.total = resp.data.obj
        }
      })
    },
    handleCurrentChange(page) {
      var _this = this 
      this.curPage = page
      getLogs(this.pageSize, page).then(resp => {
        if (resp && resp.status === 200) {
          _this.articles = resp.data
        }
      })
      getSixLogTotalAmount().then(resp => {
        _this.total = resp.data.obj 
      })
    },
    sendSixLog() {
      console.log("ready to send sixlog to main server")
      if(this.sixlog.articleTitle == '') {
        this.$message({
          type: 'info',
          message: '内容不可为空'
        })
        return
      }
      callSendSixLogApi({
        "articleTitle": this.sixlog.articleTitle,
        "articleAbstract": this.sixlog.articleAbstract,
        "articleCover": this.sixlog.articleCover
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({
            type: 'info',
            message: "已为您成功录入浮生记录"
          })
          this.sixlog.articleTitle = ""
          this.sixlog.articleAbstract = ""
          this.sixlog.articleCover = ""
        }
      })
    },
    uploadImg () {
      this.sixlog.articleCover = this.$refs.imgUpload.url
    },
    goBack() {
      window.history.back();
    },
  },
  components: {ImgUpload,SixLogBottomInput}
})
</script>
<style scoped>
.articles-area {
  margin :0 auto;
  text-align: center;
}

.article-link {
  text-decoration: none;
  color: #606266;
}

.article-link:hover {
  color: #409EFF;
}
.main_list {
  margin: auto;
  width: 90%;
  /* border: 3px solid #73AD21; */
  padding: 10px;
  margin-top: 30px;
  font-family: 'Roboto', sans-serif,'MaShanZheng-Regular';
  transition: filter 0.3s ease; /* 平滑过渡滤镜效果 */
}
.bottom_button {
    position: fixed;
    bottom: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateY(100%);
}

.blur {
  filter: blur(5px); /* 应用模糊滤镜 */
}
</style>