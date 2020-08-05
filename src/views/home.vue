<template>
  <div id="app" class="mt-5">
    <div class="container" style="min-height:100vh">
      <div class="row">
        <div class="col">
          <img src="@/Logo.png" alt="">
        </div>
      </div>
        <searchBar @atualizarLista="musicas=$event" @setData="dataBd=$event"/>
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
  watch:{
    musicas(){
      let favoritos = JSON.parse(localStorage.favoritos);
        this.musicas.map((el)=>{
          if(favoritos.includes(el.cod)){
            el.favorito=true;
          }
        });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width:50%;
}
</style>
