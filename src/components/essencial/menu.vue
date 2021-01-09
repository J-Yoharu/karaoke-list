<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand" href="#">Lista de músicas</a>
      <button class="navbar-toggler d-lg-none" @click="collapse = !collapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="navbar-collapse"
        :class="collapse ? 'collapse' : ''"
        id="collapsibleNavId"
      >
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <router-link
            to="/"
            class="nav-link"
            exact-active-class="active"
            tag="a"
          >
            <li class="nav-item">
              <v-btn text
                ><v-icon v-text="icons.mdiHome" class="mr-4"></v-icon>
                Home</v-btn
              >
            </li>
          </router-link>
          <router-link
            to="/favorites"
            class="nav-link"
            exact-active-class="active"
            tag="a"
          >
            <li class="nav-item active">
              <v-btn text>
                <v-icon v-text="icons.mdiStar" class="mr-4"></v-icon
                >Favoritos</v-btn
              >
            </li>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mdiHome, mdiStar } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiHome,
        mdiStar
      },
      collapse: true
    };
  }
};
</script>

<style>
.navbar img {
  width: 5rem;
}
</style>