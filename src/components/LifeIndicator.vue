<template>
  <div style="text-align: left">
    <span class="profile-span-text">{{ msg }}</span>
    <ul>
    <li class="profile-span-text"> 🔺{{ this.$store.state.user.cname }} 已有 &nbsp;<strong>{{ lifeIndicator.dayPassed }}</strong>  &nbsp;天使用</li>
    <li class="profile-span-text"> 🔻{{ this.$store.state.user.cname }}  还有 <strong>{{ dayLeft }}</strong> 天可用 </li>
    </ul>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="calculatePerc()"></el-progress>
    <!-- align for verticle, justify for horizontal -->
    <el-row style="margin: 8px;" type="flex" justify="space-between" align="middle">
      <span class="profile-span-text">生命进度条&不断更新的乖娃娃应用</span>
      <span>
        <audio controls loop="loop" id="bg-music" style="display: none; height: 0dp">
          <source src="http://101.43.166.211/2awa.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
      </span>
      <span class="profile-span-text">当前音乐清单为：<el-tag effect="plain" size="mini">2awa.mp3</el-tag>, 由 <el-tag size="mini">通通</el-tag> 创建</span>
      
    </el-row>
    
    <div class="function-area">
      <el-button type="warning" size="small" round @click="handleClick(1)" class="profile-span-text">
        浮生六记
      </el-button>
      <el-button type="warning" size="small" round @click="handleClick(2)" class="profile-span-text">
        {{ this.musicState? '暂停音乐':'播放音乐' }}
      </el-button>
      <el-button type="warning" size="small" round @click="handleClick(3)" class="profile-span-text">
        查看百宝箱
      </el-button>
    </div>
    <Baibao :boxShow="boxShow"></Baibao>

  </div>
</template>

<script>
import { getLifeIndicator } from '@/api/user'
import Baibao from '@/components/Baibao'

export default {
  name: 'LifeIndicator',
  data () {
    return {
      boxShow: {
        show: false
      },
      msg: '生命指示器 ⏳',
      // who: '天天', todo: remove all comment `who` later 0201 12:17
    //   calcPercent: 1,
       
      dayLeft: 22580,
      lifeIndicator: {
        dayPassed: 1,
        dayAll: 33000,
        userId: 1
      },
      musicState: false
    }
  },
  methods: {
    calculatePerc() {
        var ret = this.lifeIndicator.dayPassed / this.lifeIndicator.dayAll * 100
        ret = ret.toFixed(2) 
        return ""+ret 
    },
    callGetLifeIndicator() {
        getLifeIndicator().then(resp => {
            if (resp.status === 200) {
                if (resp.data.status == 200) {
                    this.lifeIndicator = resp.data.obj
                    this.dayLeft = this.lifeIndicator.dayAll - this.lifeIndicator.dayPassed
                    // this.who = this.lifeIndicator.username
                    // comment above cause we dont use `who` all the way, we use store
                }
            }
        })
        
    },
    handleClick(pos) {
      switch(pos) {
        case 1:
          this.$router.push({path: '/sixlog'})
          break 
        case 2:
          var audio = document.getElementById("bg-music")

          if (this.musicState == false) {
            audio.play()
            this.musicState = true
          } else {
            audio.pause()
            this.musicState = false
          }
          break 
        case 3:
          this.boxShow.show = true 
          break
        default:
          break 

      }
       
    }
  },
  created() {
    this.callGetLifeIndicator()
  },
  components: {
    Baibao
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-size: xx-large;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 4px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: larger;
}
a {
  color: #42b983;
}

.profile-span-text{
  font-family: cursive;
}

</style>
