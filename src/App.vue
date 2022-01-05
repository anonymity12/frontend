<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      message: 'runoob'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.class1{
  background: #444;
  color: #eee;
}
</style>
