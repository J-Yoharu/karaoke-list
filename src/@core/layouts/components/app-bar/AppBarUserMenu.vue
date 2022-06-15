<template>
<div>
  <v-menu
    v-if="userData"
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        bottom
        color="success"
        overlap
        offset-x="12"
        offset-y="12"
        class="ms-4"
        dot
      >
        <v-avatar
          size="40px"
          v-bind="attrs"
          color="primary"
          class="v-avatar-light-bg primary--text"
          v-on="on"
        >
          <v-img
            v-if="userData.photoURL"
            :src="userData.photoURL"
          ></v-img>
          <v-icon
            v-else
            color="primary"
            size="28"
          >
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar
            size="40px"
            color="primary"
            class="v-avatar-light-bg primary--text"
          >
            <v-img
              v-if="userData.photoURL"
              src="@/assets/images/avatars/1.png"
            ></v-img>
            <v-icon
              v-else
              color="primary"
              size="28"
            >
              {{ icons.mdiAccountOutline }}
            </v-icon>
          </v-avatar>
        </v-badge>
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align:middle"
        >
          <span class="text--primary font-weight-semibold mb-n1">
            {{ userData.displayName}}
          </span>
          <!-- <small class="text--disabled text-capitalize">{{ userData.role }}</small> -->
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item :to="{ name: 'apps-user-view', params: { id: 21 } }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item @click="logoutUser">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
  <router-link class="undecorate" v-else :to="{name: 'login'}">
    <v-btn color="primary" class="ml-3"  outlined>Fazer Login</v-btn>
  </router-link>
</div>
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from '@mdi/js'
import { useRouter } from '@core/utils'
import { getCurrentInstance } from '@vue/composition-api'
import { initialAbility } from '@/plugins/auth/acl/config'
import store from '@/store'

export default {
  setup() {
    const { router } = useRouter()
    const userData = JSON.parse(localStorage.getItem('user'))

    const logoutUser = () => {
      store.dispatch('signOut')

      // Redirect to login page
      router.push({ name: 'login' })
    }

    return {
      logoutUser,
      userData,

      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
      },
    }
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
