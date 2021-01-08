<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="songsFilter"
      disable-pagination
      :mobile-breakpoint="0"
      hide-default-footer
      no-data-text="Pesquise por um cantor ou música"
    >
      <template v-slot:top>
        <SearchBar
          @loading="loading = $event"
          @search="songsFilter = $event"
          :data="db"
        />
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
    <div class="d-flex justify-center mt-10" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
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
      songsFilter: [],
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
    },
    textFormat(text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    },

    loadSongs() {
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
    }
  },
  created() {
    this.loading = true;
    this.loadSongs();
  }
};
</script>

<style scoped>
.bg-green {
  background-color: #e1f1de;
}
</style>