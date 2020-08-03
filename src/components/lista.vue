<template>
  <div id="app">
    <div class="container" style="min-height:100vh">
      <div class="row">
        <div class="col">
            <table class="table table-bordered table-hover">
              <tr>
                <th scope="col">Cantor</th>
                <th scope="col">Musica</th>
                <th scope="col">Código</th>
              </tr>
              <tr v-for="(musica,index) in musicas" :key="index" :class="{'bg-green': (index%2==0) ? true:false}" @mousedown="addFavorite" @mouseup="cancelF=true" style="transition: all 0.5s;"> 
                
                <td>{{musica.cantor}}</td>
                <td> <img v-if="teste(musica.titulo)" src="./images/star.svg" style="width:15px"> {{musica.titulo}}</td>
                <td>{{musica.cod}}</td>
              </tr>
            </table>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
var favoritos=[];
export default {
  props:['musicas'],
  data() {
    return{
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
          clearTimeout(adicionarFavoritos);
          
        }
      },100);

      var adicionarFavoritos = setTimeout(()=>{

        favoritos = JSON.parse(localStorage.favoritos);
        favoritos.push({
          'cantor':$event.path[1].cells[0].innerText,
          'musica':$event.path[1].cells[1].innerText,
          'codigo':$event.path[1].cells[2].innerText
        });
        
        localStorage.favoritos=JSON.stringify(favoritos);
        console.log(localStorage.favoritos);
        $event.path[1].style.transform = "scale(1)";
      },500);

    },
    teste(titulo){
      let favoritos = JSON.parse(localStorage.favoritos);
      return favoritos.filter((musica)=> musica.musica==titulo).length>0;
    }
  },
  created(){
    localStorage.favoritos==undefined ? localStorage.favoritos=JSON.stringify([]):favoritos = JSON.parse(localStorage.favoritos);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  list-style:none;
}
.bg-green{
  background-color:#e1f1de;
}
table tr td{
  border:3px solid #EBF1DE;
  padding:5px;
}


</style>
