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
              <tr v-for="(musica,index) in musicas" :key="index" :class="{'bg-green': (index%2==0) ? true:false}" @mousedown="addFavorite" @mouseup="cancelF=true" style="transition: all 0.5s;"> 
                
                <td>{{musica.cantor}}</td>
                <!-- //v-if="val === musica.titulo" -->
                <td> <img  v-favorite="musica.titulo" src="./images/star.svg" style="width:15px;transition: all 1s"> {{musica.titulo}}</td>
                <td>{{musica.cod}}</td>
              </tr>
            </table>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
var val = ['WHISKEY IN THE JAR',' NOTHING ELSE MATTERS'];
import searchBar from './searchBar.vue';
export default {
  directives:{
    favorite:{
      bind(el,binding){
        el.style.display="none";
        if(val.includes(binding.value)){
          //el.style.display="inline";
        }
      }
    }
  },
  components:{
    searchBar,
  },
  data() {
    return{
      musicas:'',
      c1:false,
      cancelF:true,
    }
  },
  methods:{
    addFavorite($event){
      this.cancelF=false;
      $event.path[1].style.transform = "scale(1.05,1.05)";
      
      let monitoramento = setInterval(()=>{
        if(this.cancelF){
          $event.path[1].style.transform = "scale(1)";
          clearInterval(monitoramento);
          clearTimeout(voltarAoNormal);
          
        }
      },100);

      var voltarAoNormal = setTimeout(()=>{
        //coloca a estrelinha
        
        val.push($event.path[1].cells[1].innerText);
        console.log(val);
        $event.path[1].style.transform = "scale(1)";
      },500);

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
