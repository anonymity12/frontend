<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>欢迎关注开发者公众号：非正经研究生</h2>
  </div>
</template>

<script>
export default {
  name: 'LogDetail',
  data () {
    return {
      msg: '详情页还未实现，请等待程序员过段时间更新'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
