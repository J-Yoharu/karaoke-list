<template>
  <div>
    <v-row class="pb-5">
      <v-col cols="12" md="2" class="d-flex justify-center pr-0">
        <router-link :to="{ name: 'home' }">
          <v-img :src="appLogo" max-height="150px" max-width="150px" alt="logo" contain></v-img>
        </router-link>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center">
        <search-autocomplete
          autocomplete-absolute
          v-model="query"
          @click:item="
            query = $event.result
            search($event.result)
          "
          @search="search($event)"
        ></search-autocomplete>
      </v-col>
    </v-row>
    <v-row v-if="!musics.length">
      <v-col cols="12" md="8">
        Sua pesquisa não retornou nenhum resultado, certifique-se que você digitou corretamente ou tente utilizar um
        termo mais genérico
        <v-img src="@/assets/images/misc/search.png" class="animation-rotation" max-height="600px" max-width="600px">
        </v-img>
      </v-col>
    </v-row>
    <musics-table v-else :query="query" :musics="musics" :has-search="false"></musics-table>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import { ref, onMounted, watch } from '@vue/composition-api'
import themeConfig from '@themeConfig'
import { useRouter } from '@core/utils'
import musicsTable from '@/components/MusicsTable.vue'
import SearchAutocomplete from '@/components/SearchAutocomplete.vue'
import { pushQueryParams } from '@/helpers/route.js'
import { searchMusic } from '@/repositories/musicRepository'

export default {
  components: {
    musicsTable,
    SearchAutocomplete,
  },
  setup() {
    const icons = {
      mdiMagnify,
    }
    const query = ref('')
    const musics = ref([])
    const search = value => {
      pushQueryParams({ query: value })
      searchMusic(query.value).then(resp => {
        musics.value = resp.data
      })
    }

    const appLogo = themeConfig.app.logo

    const { route } = useRouter()
    onMounted(() => {
      if (route.value.query.query) {
        query.value = route.value.query.query
        search(query.value)
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
