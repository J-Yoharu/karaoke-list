<template>
  <div>
    <v-row class="pb-5">
      <v-col cols="12" md="2" class="d-flex justify-center pr-0">
         <router-link :to="{name: 'home'}">
         <v-img
          :src="appLogo"
          max-height="150px"
          max-width="150px"
          alt="logo"
          contain
        ></v-img>
         </router-link>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-text-field clearable hide-details="auto" label="Pesquisar" @keypress.enter="search(query)" @click:append="search(query)" v-model="query" :append-icon="icons.mdiMagnify" outlined rounded dense></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="!musics.length">
      <v-col cols="12" md="8">
          Sua pesquisa não retornou nenhum resultado, certifique-se que você digitou
          corretamente ou tente utilizar um termo mais genérico
            <v-img
              src="@/assets/images/misc/search.png"
              class="animation-rotation"
              max-height="600px"
              max-width="600px">
            </v-img>
      </v-col>
    </v-row>
    <musics-table v-else :has-search="false"></musics-table>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import { ref, onMounted } from '@vue/composition-api'
import themeConfig from '@themeConfig'
import { useRouter } from '@core/utils'
import musicsTable from '@/components/MusicsTable.vue'
import { pushQueryParams } from '@/helpers/route.js'

export default {
  components: {
    musicsTable,
  },
  setup() {
    const icons = {
      mdiMagnify,
    }
    const musics = []
    const search = value => {
      pushQueryParams({ query: value })
    }

    const appLogo = themeConfig.app.logo

    const query = ref('')
    const { route } = useRouter()
    onMounted(() => {
      if (route.value.query.query) {
        query.value = route.value.query.query
      }
    })

    return {
      icons,
      query,
      search,
      appLogo,
      musics,
    }
  },
}
</script>
