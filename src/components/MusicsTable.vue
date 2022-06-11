<template>
  <app-table :hasSearch="hasSearch" :groupBy="groupBy" :items="musics" :headers="headers" :search-placeholder="searchPlaceholder">
    <template #header-actions>
      <v-col :class="{'pb-0': $vuetify.breakpoint.mobile}">
        <v-btn :block="$vuetify.breakpoint.mobile" color="primary" @click="group">Agrupar por cantor</v-btn>
      </v-col>
    </template>
  </app-table>
</template>

<script>
import { ref } from '@vue/composition-api'
import appTable from '@core/components/tables/app-table.vue'

export default {
  components: {
    appTable,
  },
  props: {
    // musics: {
    //   required: true,
    //   type: Array,
    // },
    itemsPerPage: {
      type: Number,
      default: 50,
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    searchPlaceholder: {
      type: String,
      default: 'Pesquise por cantor ou música',
    },
  },
  setup(props) {
    const headers = [
      {
        text: 'Cantor',
        value: 'singer',
        width: '30%',
      },
      {
        text: 'Cod',
        value: 'cod',
        groupable: false,
        width: '10%',
      },
      {
        text: 'Título',
        value: 'title',
        groupable: false,
        width: '20%',
      },
      {
        text: 'Inicio',
        value: 'initial',
        groupable: false,
        width: '40%',
      },
    ]
    const musics = [
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
    ]
    const groupBy = ref(undefined)
    const group = () => {
      groupBy.value = groupBy.value ? undefined : 'singer'
    }

    const loading = ref(false)
    const query = ref('')
    const search = () => {}

    return {
      musics,
      headers,
      groupBy,
      group,

      search,
      query,
      loading,
    }
  },
}
</script>

<style>
</style>
