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
      <List />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    List: () => import("../components/List.vue")
  }
};
</script>

<style>
</style>
