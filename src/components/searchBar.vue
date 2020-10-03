<template>
  <div class="container">
      <div class="row mt-5 mb-4">
        <div class="col">
            <input id="autoComplete" class="form-control form-control-lg" style="border-radius:100px 100px 100px 100px" @keyup.enter="search" placeholder="Digite sua música ou cantor"/>
        </div>
      </div>
      <!-- <div class="row mt-4 mb-4">
        <div class="col">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="search()">PESQUISAR</button>
        </div>
      </div> -->
      <!-- <div class="row">
            <div class="col">
                <h3>{{title}}</h3>
           </div> 
      </div>-->
  </div>
</template>

<script>
  import autoComplete from './autoComplete'
  //variavel com as musicas;
  var response=[];
  var autocompleteData=[];
  export default {
    props:['nomeLista'],
    
    data(){
        return{
            title:'',
            version:'12',
        }
    },
    
    methods:{
      search(){
        let input = this.normalizeString(document.getElementById("autoComplete").value);
        document.getElementById('autoComplete').value='';
        this.$emit("atualizarLista",this.filterItem(input));
      },

      filterItem(query){
          return response.data.filter(el => (this.normalizeString(el.titulo).indexOf(query) > -1)||(this.normalizeString(el.cantor).indexOf(query) > -1)); 
      },
      
      normalizeString(value){
        return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      },

      async bdCatalogo(){     
          let pesquisa = await fetch('./bd.json',{method:'GET'}).then((resp)=>{ 
          return resp.json();
          });
          response = pesquisa;

        //Criando o bd no pai
        //this.$emit('setData',JSON.stringify(pesquisa));


          //atribuindo cantores e bandas ao autocomplete
            response.data.map((el)=>{
              if(!autocompleteData.includes(`${el.cantor} (artista)`))
                autocompleteData.push(`${el.cantor} (artista)`);

              autocompleteData.push(el.titulo);
          });    
      },
    },

    
    mounted(){
      this.bdCatalogo();
      //Quando montar a instância, chamar o método autocomplete.
        this.autocomplete(document.getElementById("autoComplete"), autocompleteData);

    },
  mixins:[autoComplete],

  }

</script>

<style>
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
input {
    padding: 10px;
}
input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}
input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;  
  text-align:left;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
  border-right: 1px solid transparent;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>>
