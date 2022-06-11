<template>
  <v-row justify="center" style="height:100%" align="center">
    <v-col cols="12" md="8" class="text-center">
      <app-logo class="mb-5" center :width="isMobile ? '100%': '50%'"></app-logo>
        <v-text-field placeholder="Pesquise por uma música ou cantor" clearable hide-details="auto" labgitel="Pesquisar" @keypress.enter="search(query)" @click:append="search(query)" v-model="query" :append-icon="icons.mdiMagnify" outlined rounded dense></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import AppLogo from '@core/components/app-logo/AppLogo.vue'
import { mdiMagnify } from '@mdi/js'
import { useRouter } from '@core/utils'
import vuetify from '@/plugins/vuetify'

export default {
  components: {
    AppLogo,
  },
  setup() {
    const isMobile = computed(() => vuetify.framework.breakpoint.mobile)
    const query = ref('')
    const { router } = useRouter()
    const search = value => {
      router.push({
        name: 'search',
        query: {
          query: value,
        },
      })
    }
    const icons = {
      mdiMagnify,
    }

    return {
      isMobile,
      query,
      search,
      icons,
    }
  },
}
</script>

<style>
</style>
