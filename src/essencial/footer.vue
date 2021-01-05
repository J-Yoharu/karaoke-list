<template>
  <v-footer>
    <v-container fluid class="text-center">
      <v-row no-gutters>
        <v-col cols="12" lg="6">
          <p>Tenha uma lista de mpusica para videokê sempre com você!!!</p>
        </v-col>
        <v-col cols="12" lg="2">
          <h3>contato</h3>
          <v-icon
            v-text="icons.mdiWhatsapp"
            size="50"
            color="light-green"
          ></v-icon>
        </v-col>
        <v-col cols="12" lg="3">
          Atualizado até o cartucho {{ version }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-center">
          © 2021 Copyright: <span> J-Yoharu / joaodiadema</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mdiWhatsapp } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        mdiWhatsapp
      },
      version: null
    };
  },
  async mounted() {
    let bd = await fetch("./bd.json", { method: "GET" }).then(resp => {
      return resp.json();
    });
    this.version = bd.version;
  }
};
</script>

<style>
</style>