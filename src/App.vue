<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Cola/>
    <sui-input type="file" placeholder="Search..." />
  </div>
</template>

<script>
import Cola from './components/Cola.vue'


export default {
  name: 'app',
  components: {
      Cola
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
</style>
