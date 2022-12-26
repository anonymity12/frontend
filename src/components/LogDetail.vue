<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essentiadsdfl Links</h2>s
 
  </div>
</template>

<script>
export default {
  name: 'LogDetail',
  data () {
    return {
      msg: 'this is test page'
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
