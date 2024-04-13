<template>
  <div id="app" style="background-color: rgba(235, 235, 235, 0.08)">
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.class1{
  background: #444;
  color: #eee;
}
</style>
