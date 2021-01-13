<template>
  <v-app>
    <!-- <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>
        <v-img
          src="./assets/Logo.png"
          max-width="100"
          alt="Logo videoke Augusto"
        ></v-img>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tabs align-with-title>
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </v-app-bar> -->
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
  data() {
    return {};
  },
  methods: {
    compareAndUpdate(current, update) {
      current.push(...update.splice(current.length, update.length));
      return current;
    },
    getCurrentVersion() {
      this.$axios("./bd.json").then(resp => {
        if (resp.data.version == "34D") {
          console.log("TÁ ATUALIZADO SEU DB!");
          return;
        }
        let updatedDb = this.compareAndUpdate(
          JSON.parse(localStorage.dbKaraoke),
          resp.data.data
        );

        localStorage.dbKaraoke = JSON.stringify(updatedDb);
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
    this.getCurrentVersion();
  }
};
</script>
<style>
.bg-green {
  background-color: #e1f1de;
}
</style>
