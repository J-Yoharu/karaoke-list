<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <img
        src="../assets/Logo.png"
        max-width="100"
        alt="Logo videoke Augusto"
        style="width: 30vw"
    /></v-col>
    <v-col cols="12">
      <List :db="db" />
      <div class="d-flex justify-center mt-10" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      db: [],
      loading: false
    };
  },
  components: {
    List: () => import("../components/List.vue")
  },
  methods: {
    async loadSongs() {
      this.loading = true;
      this.$axios("./bd.json")
        .then(res => {
          this.db = res.data.data.map(song => {
            return {
              cantor: this.textFormat(song.cantor),
              titulo: this.textFormat(song.titulo),
              cod: this.textFormat(song.cod)
            };
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    textFormat(text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    }
  },
  created() {
    this.loadSongs();
  }
};
</script>

<style>
</style>
