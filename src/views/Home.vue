<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-img
        src="../assets/Logo.png"
        max-width="100"
        alt="Logo videoke Augusto"
      ></v-img
    ></v-col>
    <v-col cols="12">
      <searchBar
        @atualizarLista="musicas = $event"
        @setData="dataBd = $event"
      />
      <lista :musicas="musicas" />
    </v-col>
  </v-row>
</template>

<script>
import searchBar from "../components/searchBar.vue";
import lista from "../components/lista.vue";
export default {
  components: {
    searchBar,
    lista
  },
  data() {
    return {
      musicas: ""
    };
  },
  watch: {
    musicas() {
      let favoritos = JSON.parse(localStorage.favoritos);
      this.musicas.map(el => {
        if (favoritos.includes(el.cod)) {
          el.favorito = true;
        }
      });
    }
  }
};
</script>

<style>
</style>
