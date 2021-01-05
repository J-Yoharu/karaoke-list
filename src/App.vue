<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon>imagem</v-app-bar-nav-icon>
      <v-app-bar-title> eeeeeeeee dwdw </v-app-bar-title>
    </v-app-bar>
    <menuBar />

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <footerBar />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    menuBar: () => import("./components/essencial/menu.vue"),
    footerBar: () => import("./components/essencial/footer.vue")
  },

  data: () => ({
    //
  })
};
</script>
