<template>
  <div id="app">
    <router-view/>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import BottomNavigation from './components/BottomNavigation.vue'

export default {
  name: 'App',
  components: {
    BottomNavigation
  }
}
</script>

<style>
@font-face {
  font-family: 'MaShanZheng-Regular';
  src: url('./assets/MaShanZheng-Regular.ttf') format('truetype');
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FFF1CB;
}
.class1{
  background: #444;
  color: #eee;
}

</style>
