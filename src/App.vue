<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <img src="@/Logo.png" alt="">
        </div>
      </div>
    </div>

    <lista-tag/>
    <footer-tag/>
  </div>
</template>

<script>
import Footer from './essencial/footer.vue'
export default {
  name: 'App',
  components: {
    'footer-tag':Footer,
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
img{
  width:50%;
}
</style>
