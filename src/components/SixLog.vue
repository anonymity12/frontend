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
    <div class="main_list">
      <!--<el-button @click="addArticle()">添加文章</el-button>-->
      <el-row style="margin-bottom: 8px">
        <el-col :span="24">
        <el-input
          type="textarea"
          rows="1"
          v-model="sixlog.articleTitle"
          style="margin: 0px 0px;font-size: 20px;"
          placeholder="1. 请输入日志"
          >
        </el-input>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 30px">
        <el-col :span="8">
        <el-button @click="dialogVisible = true">2. 添加图片</el-button>
        </el-col>

        <el-col :span="8">
        <el-button @click="sendSixLog">3. 写入记录 </el-button>
        </el-col>

        <el-col :span="8">
        <el-button @click="loadArticles">4. 刷新记录 </el-button>
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        width="90%">
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="sixlog.articleCover" autocomplete="off" placeholder="上传成功这里就会有链接的"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>
        <el-divider content-position="left">详情</el-divider>
        <el-input
          type="textarea"
          v-model="sixlog.articleAbstract"
          rows="4"
          maxlength="4096"
          placeholder="这里填写更多额外的文字内容"
          show-word-limit>
        </el-input>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">放弃图片上传</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div style="width: 100%; margin-top: 20px;">
        <el-card v-for="article in articles" :key="article.id" style="text-align: left;width: 100%; min-height: 200px; margin-bottom: 6px;">
          <div style="float:left;width:100%;">
            <router-link class="article-link" :to="{path:'sixlog/article',query:{id: article.id}}">
              <span style="font-size: 20px">
              <strong>{{article.articleTitle}}</strong>
              </span>
            </router-link>
          </div>
          <div style="float:left;width:100%;">
            <el-divider content-position="left">{{article.articleDate | moment}} by {{ article.ownerName }}</el-divider>
            <router-link class="article-link" :to="{path:'sixlog/article',query:{id: article.id}}">
              <p>{{article.articleAbstract}}</p>
            </router-link>
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
  </div>
</template>
<script>
import { getLogs } from "@/api/user"
import { getSixLogTotalAmount } from "@/api/user"
import ImgUpload from './ImgUpload'
import { callSendSixLogApi } from "@/api/user"
import { apiLikeASixLog } from "../api/sixlog"
export default({
  name: 'SixLog',
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
      dialogVisible: false
    }
  },
  mounted() {
    this.loadArticles()
    this.loadLogsAmount()
  },
  methods: {
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
  components: {ImgUpload}
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
}

 
</style>