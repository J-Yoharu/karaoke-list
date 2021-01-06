<template>
  <v-container>
    <v-row dense class="d-flex justify-content-center">
      <v-col cols="12" lg="8">
        <v-text-field
          rounded
          outlined
          dense
          autocomplete="off"
          v-model="search"
          @keyup.enter="getData()"
          placeholder="Música ou Cantor"
          label="Pesquisar"
          :append-icon="icons.mdiMagnify"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="8">
        <v-list class="col-12 position-absolute p-0 mt-1" style="z-index: 3">
          <v-list-item
            dense
            class="border-bottom"
            v-for="(singerOrMusic, index) in autoCompleteValue.slice(0, 10)"
            :key="index"
            @click="getData(singerOrMusic)"
          >
            {{ singerOrMusic }}
          </v-list-item>
        </v-list>
        <!-- <div
          class="col-12 bg-danger position-absolute p-0 mt-1"
          style="z-index: 3"
        >
          <div
            class="d-flex justify-content-start bg-light border p-1"
            v-for="(singerOrMusic, index) in autoCompleteValue.slice(0, 20)"
            :key="index"
            @click="getData(singerOrMusic)"
          >
            {{ singerOrMusic }}
          </div>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiMagnify } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiMagnify
      },
      search: "",
      autoCompleteValue: "",
      songs: ""
    };
  },
  methods: {
    getData(data) {
      if (data == undefined) {
        this.search = this.autoCompleteValue[0];

        data = this.search;
        this.autoCompleteValue = "";
        // $('#infoModal').modal(options)
      } else {
        this.search = data;
      }

      this.autoCompleteValue = "";
      this.boolean = false;
      this.$emit("search", this.search);
    },
    undecorate(string) {
      if (string != undefined) {
        string = string.toLowerCase();
        string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return string;
      }
      return false;
    },
    autoComplete() {
      if (this.search.length == 0) {
        this.autoCompleteValue = "";
        this.finalValue = "";
        return false;
      }
      // Atribui o autoCompleteValue correspondente do input se encontrado
      var result = this.songs.map(value => {
        // newsearch = this.undecorate(this.search)
        if (
          this.undecorate(value.cantor).startsWith(this.undecorate(this.search))
        ) {
          return value.cantor;
        }

        if (
          this.undecorate(value.titulo).startsWith(this.undecorate(this.search))
        ) {
          return value.titulo;
        }
      });

      var cantor = [];
      result.map(v => {
        if (!cantor.includes(v) && v != undefined) {
          cantor.push(v);
        }
      });
      this.autoCompleteValue = cantor;
    }
  },

  created() {
    this.$axios("./bd.json").then(res => {
      this.songs = res.data.data;
    });
  },
  watch: {
    search() {
      if (this.boolean) {
        this.autoComplete(this.boolean);
        return false;
      }
      this.boolean = true;
    }
  }
};
</script>

<style>
</style>