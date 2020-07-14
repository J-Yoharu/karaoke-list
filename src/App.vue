<template>
  <div id="app">
    <lista-tag/>
    <footer-tag/>
  </div>
</template>

<script>
// import Lista from './components/lista.vue'
import Footer from './essencial/footer.vue'
export default {
  name: 'App',
  components: {
    'footer-tag':Footer,
    // 'lista-a':Lista,
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
