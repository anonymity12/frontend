<template>
  <div>
    <el-menu
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      >
      <el-menu-item>
        <a href="http://101.43.166.211:8091/#/home">返回主站</a>
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">
        浮生六记
      </span>
      
    </el-menu>


    <!-- main list for posts: -->
    <div class="main_list">
      <!--<el-button @click="addArticle()">添加文章</el-button>-->
      <el-row style="margin-bottom: 30px">
        <el-col :span="18">
        <el-input
          v-model="sixlog.articleTitle"
          style="margin: 0px 0px;font-size: 20px;"
          placeholder="1. 请输入日志"></el-input>
        </el-col>
        
        <el-col :span="2">
        <el-button @click="dialogVisible = true">2. 添加图片</el-button>
        </el-col>

        <el-col :span="2">
        <el-button @click="sendSixLog">3. 写入记录 </el-button>
        </el-col>

        <el-col :span="2">
        <el-button @click="loadArticles">4. 刷新记录 </el-button>
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%">
        <el-divider content-position="left">图片备注</el-divider>
        <el-input
          type="textarea"
          v-model="sixlog.articleAbstract"
          rows="3"
          maxlength="255"
          show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="sixlog.articleCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div style="width: 100%; margin-top: 20px;">
        <el-card style="text-align: left;width: 100%;">
          <div v-for="article in articles" :key="article.id">
            <div style="float:left;width:65%;height: 150px;">
              <router-link class="article-link" :to="{path:'sixlog/article',query:{id: article.id}}">
                <span style="font-size: 20px">
                <strong>{{article.articleTitle}}</strong>
                </span>
              </router-link>
              <el-divider content-position="left">{{article.articleDate}}</el-divider>
              <router-link class="article-link" :to="{path:'sixlog/article',query:{id: article.id}}">
                <p>{{article.articleAbstract}}</p>
              </router-link>
            </div>
            <el-image
              style="margin:18px 0 0 30px;width:200px;height: 200px"
              :src="article.articleCover"
              fit="cover">
            </el-image>
            <el-divider></el-divider>
          </div>
        </el-card>
      </div>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
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
export default({
  name: 'SixLog',
  data() {
    return {
      articles: [],
      pageSize: 5,
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
        }
      })
    },
    uploadImg () {
      this.sixlog.articleCover = this.$refs.imgUpload.url
    }
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
}

 
</style>