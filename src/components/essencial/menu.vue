<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand" href="#">Lista de músicas</a>
      <button class="navbar-toggler d-lg-none" @click="collapse = !collapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="navbar-collapse"
        :class="collapse ? 'collapse' : ''"
        id="collapsibleNavId"
      >
        <v-tabs
          :vertical="$vuetify.breakpoint.xs"
          :grow="$vuetify.breakpoint.xs"
        >
          <v-tab to="/"
            ><v-icon v-text="icons.mdiHome" class="mr-4"></v-icon>Home</v-tab
          >
          <v-tab to="/favorites">
            <v-icon v-text="icons.mdiStar" class="mr-4"></v-icon
            >Favoritos</v-tab
          >
          <v-tab to="/updates">
            <v-icon v-text="icons.mdiUpdate" class="mr-4"></v-icon
            >Atualizações</v-tab
          >
          <v-tab to="/news">
            <v-icon v-text="icons.mdiUpdate" class="mr-4"></v-icon
            >Sobre a nova versão</v-tab
          >
        </v-tabs>
        <div class="d-flex justify-center">
          <v-btn class="m-auto" color="primary" @click="redirectToHomolog">Mudar para nova versão</v-btn>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mdiHome, mdiStar, mdiUpdate } from "@mdi/js";
export default {
  watch:{
    $route(){
      this.collapse = true;
    }
  },
  data() {
    return {
      icons: {
        mdiHome,
        mdiStar,
        mdiUpdate
      },
      collapse: true
    };
  },
  methods: {
    redirectToHomolog() {
      window.location = 'https://homolog.listademusicas.com.br'
    }
  }
};
</script>

<style>
.navbar img {
  width: 5rem;
}
</style>