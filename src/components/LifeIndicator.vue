<template>
  <div style="text-align: left">
    <h1>{{ msg }}</h1>
    <ul>
    <li> 🔺{{ who }} has &nbsp;<strong>{{ lifeIndicator.dayPassed }}</strong>  &nbsp;days used</li>
    <li> 🔻{{ who }}  has <strong>{{ dayLeft }}</strong> days more </li>
    </ul>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="calculatePerc()"></el-progress>
    <a>DreamList</a>
  </div>
</template>

<script>
import { getLifeIndicator } from '@/api/user'
export default {
  name: 'LogDetail',
  data () {
    return {
      msg: '生命指示器 ⏳',
      who: '天天',
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
