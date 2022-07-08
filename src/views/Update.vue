<template>
  <div>
    <v-row justify="end">
      <v-col cols="5" md="4">
        <v-autocomplete
          chips
          small-chips
          multiple
          label="Pacotes"
          clearable
          placeholder="Selecione os pacotes"
          :items="musicPackages"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <musics-table :musics="[]" search-placeholder="Pesquise uma atualização"></musics-table>
  </div>
</template>

<script>
import MusicsTable from '@/components/MusicsTable.vue'
import { musicsPackages } from '@/repositories/musicRepository'
import { onMounted, ref } from '@vue/composition-api'
import toasts from '@/plugins/alert'
export default {
  components: {
    MusicsTable,
  },
  setup() {
    const musicPackages = ref([])
    const loadPackages = () => {
      musicsPackages()
        .then(resp => {
          musicPackages.value = resp.data
        })
        .catch(err => {
          console.log(err)
          toasts.error('Erro ao carregar as atualizações, tente novamente mais tarde!')
        })
    }

    onMounted(() => {
      loadPackages()
    })
    return {
      musicPackages,
    }
  },
}
</script>

<style></style>
