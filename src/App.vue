<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    mounted: function () {
      //localStorage.setItem('imgPath', 'http://47.104.202.152/');
    },

  }
</script>

<style>
#app {
  font-family: 'PingFang', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
