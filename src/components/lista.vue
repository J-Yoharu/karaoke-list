<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col p-0">
          <table class="table table-bordered table-hover">
            <tr>
              <th scope="col" colspan="2">Cantor/Musica</th>
              <!-- <th scope="col">Musica</th> -->
              <th scope="col">Código</th>
            </tr>
            <tr
              v-for="(musica, index) in musicas"
              :key="index"
              :class="{ 'bg-green': index % 2 == 0 ? true : false }"
              v-touchdown
              @mousedown="addFavorite"
              @mouseup="cancelFavorite"
              style="cursor: pointer; transition: all 0.5s"
            >
              <td style="border-right: 0">
                <!-- <img
                  v-if="musica.favorito"
                  src="./images/star.svg"
                  style="width: 15px"
                /> -->
              </td>
              <td style="user-select: none; border-left: 0">
                <div>
                  <!-- <img src="./images/microfone.svg" style="width: 10px" /> -->
                  {{ musica.cantor }}
                </div>
                <!-- <img src="./images/musica.svg" style="width: 10px" /> -->
                {{ musica.titulo }}
              </td>
              <td style="user-select: none">{{ musica.cod }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var vm;
/* eslint-disable */
export default {
  directives: {
    touchdown: {
      bind(el) {
        el.addEventListener("ontouchmove", vm.addFavorite);
        el.addEventListener("ontouchend", vm.cancelFavorite);
      }
    }
  },
  props: ["musicas"],
  data() {
    return {
      c1: false,
      cancelF: true
    };
  },
  methods: {
    addFavorite($event) {
      let favoritos = JSON.parse(localStorage.favoritos);
      favoritos.push($event.path[1].cells[2].innerText);
      this.musicas.map(el => {
        if (el.cod == $event.path[1].cells[2].innerText) {
          el.favorito = true;
        }
      });

      localStorage.favoritos = JSON.stringify(favoritos);
      console.log(localStorage.favoritos);
    },
    cancelFavorite() {
      this.cancelF = true;
    }
  },
  created() {
    localStorage.favoritos == undefined
      ? (localStorage.favoritos = JSON.stringify([]))
      : false;
    vm = this;
  },
  watch: {
    musicas() {
      console.log("Atualizou no lista");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style: none;
}
.bg-green {
  background-color: #e1f1de;
}
table tr td {
  border: 3px solid #ebf1de;
  padding: 6px;
}
</style>
