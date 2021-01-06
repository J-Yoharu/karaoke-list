<template>
  <v-data-table
    :headers="headers"
    :items="songs"
    :search="search"
    :loading="loading"
    disable-pagination
    :mobile-breakpoint="0"
    hide-default-footer
    no-data-text="Pesquise por um cantor ou música"
  >
    <template v-slot:top>
      <SearchBar @search="searchSongs($event)" />
    </template>

    <template v-slot:body="{ items }">
      <tbody>
        <tr
          v-for="(music, index) in items"
          :key="index"
          :class="index % 2 == 0 ? 'bg-green' : ''"
        >
          <td>{{ music.cantor }}</td>
          <td>{{ music.titulo }}</td>
          <td>{{ music.cod }}</td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  components: {
    SearchBar: () => import("./SearchBar")
  },
  data() {
    return {
      headers: [
        {
          text: "Cantor",
          value: "cantor"
        },
        {
          text: "Música",
          value: "titulo"
        },
        {
          text: "Código",
          value: "cod"
        }
      ],
      songs: [],
      search: "",
      selected: "",
      loading: false,
      db: []
    };
  },
  methods: {
    searchSongs(data) {
      this.search = data;
      this.songs = this.db;
    }
  },
  created() {
    this.loading = true;
    this.$axios("./bd.json")
      .then(res => {
        this.db = res.data.data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style scoped>
.bg-green {
  background-color: #e1f1de;
}
</style>