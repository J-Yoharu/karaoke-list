<template>
  <v-row justify="center" style="height: 100%" align="center">
    <v-col cols="12" md="8" class="text-center">
      <app-logo class="mb-5" center :width="isMobile ? '100%' : '50%'"></app-logo>
      <search-autocomplete
        autocomplete-absolute
        @click:item="search($event.result)"
        @search="search($event)"
        @enter="search($event)"
        v-model="query"
      ></search-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import AppLogo from '@core/components/app-logo/AppLogo.vue'
import SearchAutocomplete from '@/components/SearchAutocomplete.vue'

import { useRouter } from '@core/utils'
import { ref } from '@vue/composition-api'
import { isMobile } from '@/helpers/breakpoint'
export default {
  components: {
    AppLogo,
    SearchAutocomplete,
  },
  setup() {
    const { router } = useRouter()
    const search = value => {
      router.push({
        name: 'search',
        query: {
          query: value,
        },
      })
    }
    const query = ref('')

    return {
      isMobile,
      search,
      query,
    }
  },
}
</script>
