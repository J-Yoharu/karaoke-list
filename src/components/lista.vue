<template>
  <div id="app">
    <div class="container" style="min-height:100vh">
      <search-bar @atualizarLista="musicas=$event"/>
      <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
              <tr>
                <th scope="col">Cantor</th>
                <th scope="col">Código</th>
                <th scope="col">Musica</th>
              </tr>
              <tr v-for="(musica,index) in musicas" :key="index" :class="{'bg-green': (index%2==0) ? true:false}" @mousedown="addFavorite" @mouseup="cancelF=true" style="transition: all 1s;"> 
                
                <td>{{musica.cantor}}</td>
                <td> <img src="./images/star.svg" style="width:15px"> {{musica.titulo}}</td>
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
      c1:false,
      cancelF:true,
      val:['banana', 'mexirica'],
    }
  },
  methods:{
    addFavorite($event){
      this.cancelF=false;
      $event.path[1].style.transform = "scale(1.05,1.05)";
    
      
      let a = setInterval(()=>{
        if(this.cancelF){
          $event.path[1].style.transform = "scale(1)";
          clearInterval(a);
          clearTimeout(timer);
        }
      },100);

      var timer = setTimeout(()=>{
        //$event.path[1].cells[1].innerText
        this.val.push('PORRA')
        console.log(this.val)
        $event.path[1].style.transform = "scale(1)";
        setTimeout(()=>{
        this.val = '';
      },2000)
      },1000);

      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  list-style:none;
}
.bg-green{
  background-color:#EBF1DE;
}
table tr td{
  border:3px solid #EBF1DE;
  padding:5px;
}


</style>
