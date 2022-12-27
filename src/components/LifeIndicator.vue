<template>
  <div style="text-align: left">
    <h1>{{ msg }}</h1>
    <li> {{ who }} already spent <strong>{{ dayPassed }}</strong> days, and {{ who }}
        has <strong>{{ dayLeft }}</strong> days left </li>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="calculatePerc()"></el-progress>
    <a>DreamList</a>
  </div>
</template>

<script>
export default {
  name: 'LogDetail',
  data () {
    return {
      msg: 'Life Indicator ⏳',
      who: '天天',
    //   calcPercent: 1,
      dayPassed: 9987,
      dayLeft: 32580,
      dayAll: 32580
    }
  },
  methods: {
    calculatePerc() {
        this.dayLeft = this.dayAll - this.dayPassed
        var ret = this.dayPassed / this.dayAll * 100
        ret = ret.toFixed(2) 
        return ""+ret 
    }
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
  display: inline-block;
  margin: 0 4px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
a {
  color: #42b983;
}
</style>
