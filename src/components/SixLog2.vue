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
      <div style="width: 100%;">
        <el-card v-for="article in articles" :key="article.id" style="text-align: left;width: 100%;  margin-bottom: 6px;">
          <div style="float:left;width:100%;">
            <span style="font-size: 20px">
            <strong>{{article.logContent}}</strong>
            </span>
          </div>
          <div style="float:left;width:100%;">
            <el-divider content-position="right"> {{ article.ownerName }} 于 {{article.logDate | moment}} 在 中国</el-divider>
          </div>
          <el-image v-show="article.logCover!=''"
            style="margin:8px 0 0 8px;width:auto;"
            :src="article.logCover"
            fit="cover">
          </el-image>
          
          <!-- <el-button type="info" size="small" 
                  icon="el-icon-star-off" 
                  @click="handleLikeBtnClicked(article.id)">
                  {{article.likeCounts}} 赞
          </el-button> -->
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
    <div style="min-height: 100px;"></div>
    <el-button type="success" icon="el-icon-plus"  class="bottom_button" @click="toggleBottomInput" ref="toggleInputBtn"></el-button>

    <transition name="slide">
    <SixLogBottomInput v-show="showBottomInput" @onSentSixLog="childComponentSentSixLog" ref="sixLogBottomInput"/>
    </transition>
  </div>
</template>
<script>
import { api_getAllLogByPage } from "@/api/sixlog2" // todo 12-14 continue work on me when u back from dinner
import { api_getTotalAmount } from "@/api/sixlog2"
import SixLogBottomInput from './SixLogBottomInput'
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
    childComponentSentSixLog() {
      console.log("close bottom input, cause user click send btn in bottom input, we need to refresh the sixlog list")
      this.showBottomInput = !this.showBottomInput;
      api_getAllLogByPage(this.pageSize, this.curPage).then(resp => {
        if (resp && resp.status === 200) {
          this.articles = resp.data
        }
      })
    },
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

    loadArticles() {
      var _this = this 
      api_getAllLogByPage(this.pageSize, 1).then(resp => {
        console.log("api/sixlog2 return: ", resp)
        if (resp && resp.status === 200) {
          _this.articles = resp.data
        }
      })
    },
    loadLogsAmount() {
      var _this = this 
      api_getTotalAmount().then(resp => {
        console.log("/api/sixlog/getTotalAmount return: ", resp)
        if (resp && resp.status === 200) {
          _this.total = resp.data.obj
        }
      })
    },
    handleCurrentChange(page) {
      var _this = this 
      this.curPage = page
      api_getAllLogByPage(this.pageSize, page).then(resp => {
        if (resp && resp.status === 200) {
          _this.articles = resp.data
        }
      })
      api_getTotalAmount().then(resp => {
        _this.total = resp.data.obj 
      })
    },


    goBack() {
      window.history.back();
    },
  },
  components: {SixLogBottomInput}
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
  padding: 10px;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif,'MaShanZheng-Regular';
  transition: filter 0.3s ease; /* 平滑过渡滤镜效果 */
}
.bottom_button {
    position: fixed;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
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