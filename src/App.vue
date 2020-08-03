<template>
  <div id="app">

    <home-tag/>

    <footer-tag/>
    
  </div>
</template>

<script>
import Footer from './essencial/footer.vue'
import home from './views/home.vue'
export default {
  name: 'App',
  components: {
    'footer-tag':Footer,
    'home-tag':home,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
