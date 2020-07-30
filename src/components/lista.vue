<template>
  <div id="app">
    <div class="container" style="min-height:100vh">
      <search-bar @atualizarLista="musicas=$event"/>
      <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover table-dark">
              <tr>
                <td>Cantor</td>
                <td>Musica</td>
                <td>Código</td>
              </tr>
              <tr v-for="(musica,index) in musicas" :key="index">
                <td>{{musica.cantor}}</td>
                <td>{{musica.titulo}}</td>
                <td>{{musica.cod}}</td>
              </tr>
            </table>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import searchBar from './searchBar.vue';
export default {
  components:{
    searchBar,
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
ul{
  list-style:none;
}
</style>
