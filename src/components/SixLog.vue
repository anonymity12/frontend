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
      <div style="width: 100%;">
        <el-card style="text-align: left;width: 100%;">
          <div v-for="article in articles" :key="article.id">
            <div style="float:left;width:75%;height: 150px;">
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
              style="margin:18px 0 0 30px;width:100px;height: 100px"
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
export default({
  name: 'SixLog',
  data() {
    return {
      articles: [],
      pageSize: 4,
      total: 0,
      keywords: ''
    }
  },
  mounted() {
    this.loadArticles()
  },
  methods: {
    // these methods require backend to support pagination api
    loadArticles() {
      var _this = this 
      getLogs(this.pageSize, 1).then(resp => {
        console.log("api/sixlog return: ", resp)
        if (resp && resp.status === 200) {
          _this.articles = resp.data
          _this.total = resp.data.length
        }
      })
    },
    handleCurrentChange(page) {
      var _this = this 
      getLogs(this.pageSize, page).then(resp => {
        
        if (resp && resp.status === 200) {
          _this.articles = resp.data
          _this.total = resp.data.length
        }
      })
    }
  }
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
  width: 60%;
  /* border: 3px solid #73AD21; */
  padding: 10px;
  margin-top: 30px;
}

 
</style>