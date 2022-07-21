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
      <List :db="db"/>
      <div class="d-flex justify-center mt-10" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-col>
    <v-dialog persistent width="500" v-model="dialogRelease">
      <v-card>
        <v-card-title class="d-flex">
          Nova versão 👀 <v-spacer></v-spacer> <v-btn icon @click="closeReleaseDialog(false)">  <v-icon v-text="icons.mdiClose"> </v-icon> </v-btn>
        </v-card-title>
        <v-card-text>
          <p>
            Lançamos uma nova versão no site da lista de músicas,
            aprimorando ainda mais o site a fim de melhorar a experiências dos nossos 
            usuários.  <br/> 
            Clique no botão abaixo para acessa-la ou clique no botão do menu <br/>
            <b>Após fechar, você não receberá mais esse aviso</b>
          </p>
          <div>
            <v-btn block color="primary" @click="closeReleaseDialog(true)">Acesse aqui 😎</v-btn>
            <v-btn block color="error" class="mt-2" @click="closeReleaseDialog(false)">Não quero acessar 😢</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import validBd from "../mixins/validBd.js";
import { mdiClose } from '@mdi/js'
export default {
  mixins: [validBd],
  data() {
    return {
      db: [],
      loading: false,
      dialogRelease: false,
      icons: {
        mdiClose
      }
    };
  },
  components: {
    List: () => import("../components/List.vue")
  },
  created() {
    if(localStorage.releaseDialog == undefined) this.dialogRelease = true
    this.valid();
  },
  methods: {
    closeReleaseDialog(redirect) {
      localStorage.releaseDialog = false
      this.dialogRelease = false
      if(redirect) window.location = "https://homolog.listademusicas.com.br/home"
    }
  }
};
</script>

<style>

</style>
