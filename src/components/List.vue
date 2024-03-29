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
          v-if="searchable"
          @loading="loading = $event"
          @search="songsFilter = $event; firstSearch = true"
          :data="db"
        />
        <div class="text-center" v-if="!firstSearch">
          <v-chip color="primary" @click="$router.push({name: 'updates'})">
            {{songsFilter.length}} novas músicas, confira abaixo ou no menu!
          </v-chip>
    </div>
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
            <td class="text-center">
              <v-btn
                dense
                icon
                @click="addFavorite(index)"
                v-if="!music.favorite"
              >
                <v-icon v-text="icons.mdiPlus"></v-icon>
              </v-btn>
              <v-icon v-else color="orange" v-text="icons.mdiStar"></v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

    <div class="fixed-bottom">
      <v-snackbar color="green" :value="snackbar.value" absolute bottom right>
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mdiPlus, mdiStar } from "@mdi/js";
export default {
  props: {
    db: Array,
    searchable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    loadingAllDb:{
      type: Boolean,
      default: false
    }
  },
  components: {
    SearchBar: () => import("./SearchBar")
  },
  created(){
     if(this.loadingAllDb){
        this.songsFilter = this.db;
        return;
    }
  },
  data() {
    return {
      icons: {
        mdiPlus,
        mdiStar
      },
      qtdLastMusics: 80,
      update:[],
      snackbar: {
        value: false,
        message: null
      },

      headers: [
        {
          text: "Cantor",
          value: "cantor",
          sortable: false
        },
        {
          text: "Música",
          value: "titulo",
          sortable: false
        },
        {
          text: "Código",
          value: "cod",
          sortable: false
        },
        {
          text: "favoritar",
          value: "actions",
          sortable: false
        }
      ],
      songsFilter: [],
      firstDbLoading: false,
      firstSearch: false,
      search: "",
      selected: ""
    };
  },
  watch:{
    songsFilter(){
      this.$emit('changeSongs', this.songsFilter);
    },
    db(){
      //Quando demorar pra atribuir valor ao db, vai cair nesse watch só uma vez, se não vai pelo created
      if(this.db.length > 0 && !this.firstDbLoading){
        this.songsFilter = this.db.slice(this.db.length - this.qtdLastMusics, this.db.length);
        this.firstDbLoading = true
      }
    }
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

    addFavorite(index) {
      let db = JSON.parse(localStorage.dbKaraoke);

      db.forEach(music => {
        if (music.cod == this.songsFilter[index].cod) {
          music.favorite = true;
          //Atualizar no front sem ter que carregar todas músicas novamente.
          this.songsFilter[index].favorite = true;

          return;
        }
      });

      localStorage.dbKaraoke = JSON.stringify(db);

      this.showSnackBar("Musica adicionada aos favoritos com sucesso!");
      console.log("chamou favorito");
    },
    showSnackBar(message) {
      this.snackbar.value = true;
      this.snackbar.message = message;
      setTimeout(() => {
        this.clearSnackBar();
      }, 1000);
    },
    clearSnackBar() {
      this.snackbar.value = false;
      this.snackbar.message = null;
    }
  }
};
</script>
