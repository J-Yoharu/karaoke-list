<template>
  <div id="app">
    <menu-tag/>

    <home-tag/>

    <footer-tag/>
    
  </div>
</template>

<script>
import Footer from './essencial/footer.vue'
import menu from './essencial/menu.vue'
import home from './views/home.vue'
export default {
  name: 'App',
  components: {
    'footer-tag':Footer,
    'home-tag':home,
    'menu-tag':menu,
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
}
</style>
