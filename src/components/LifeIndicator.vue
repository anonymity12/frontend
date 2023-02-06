<template>
  <div style="text-align: left">
    <h3>{{ msg }}</h3>
    <ul>
    <li> 🔺{{ this.$store.state.user.cname }} 已有 &nbsp;<strong>{{ lifeIndicator.dayPassed }}</strong>  &nbsp;天使用</li>
    <li> 🔻{{ this.$store.state.user.cname }}  还有 <strong>{{ dayLeft }}</strong> 天可用 </li>
    </ul>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="calculatePerc()"></el-progress>
    <a>生命进度条&不断更新的乖娃娃应用</a>
    <span style="float: right;">
      <audio controls autoplay muted>
        <source src="http://101.43.166.211/2awa.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </span>

  </div>
</template>

<script>
import { getLifeIndicator } from '@/api/user'
export default {
  name: 'LogDetail',
  data () {
    return {
      msg: '生命指示器 ⏳',
      // who: '天天', todo: remove all comment `who` later 0201 12:17
    //   calcPercent: 1,
       
      dayLeft: 22580,
      lifeIndicator: {
        dayPassed: 1,
        dayAll: 33000,
        userId: 1
      }
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
        
    }
  },
  created() {
    this.callGetLifeIndicator()
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
</style>
