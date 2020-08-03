<template>
  <div id="app">
    <div class="container" style="min-height:100vh">
      <div class="row">
        <div class="col">
          <img src="@/Logo.png" alt="">
        </div>
      </div>
        <searchBar @atualizarLista="musicas=$event"/>
        <lista :musicas="musicas"/>
    </div> 
  </div>
</template>

<script>
import searchBar from '../components/searchBar.vue';
import lista from '../components/lista.vue';
export default {
  components:{
    searchBar,
    lista,
  },
  data() {
    return{
      musicas:'',
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width:50%;
}
</style>
