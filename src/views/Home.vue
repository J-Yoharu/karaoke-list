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
      <List :db="db" @changeSongs="disableStamp"/>
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
import validBd from "../mixins/validBd.js";

export default {
  mixins: [validBd],
  data() {
    return {
      db: [],
      loading: false,
      stamp:true
    };
  },
  components: {
    List: () => import("../components/List.vue")
  },
  created() {
    this.valid();
  },
  methods:{
    disableStamp(musics){
      if(musics.length > 0){
        this.stamp = false;
      }
    }
  }
};
</script>

<style>
.stamp{
  border-style: double;
  border-radius: 10px;
  text-align: center;
  transform: rotate(10deg);
  margin-top: 5rem;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;
  padding: 25px;
  border-width: 15px;
  font-family:cursive;
  font-size: 2rem;
}

</style>
