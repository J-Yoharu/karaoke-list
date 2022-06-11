<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-text-field label="Pesquisar" @click:append="search(query)" v-model="query" :append-icon="icons.mdiMagnify" outlined rounded dense></v-text-field>
      </v-col>
    </v-row>
    <app-table :items="[]" :headers="[]" :has-search="false"></app-table>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import AppTable from '@core/components/tables/app-table'
import { ref } from '@vue/composition-api'
import { pushQueryParams } from '@/helpers/route.js'

export default {
  components: {
    AppTable,
  },
  setup() {
    const icons = {
      mdiMagnify,
    }

    const search = value => {
      pushQueryParams({ query: value })
    }
    const query = ref('')

    return {
      icons,
      query,
      search,
    }
  },
}
</script>

<style>
</style>
