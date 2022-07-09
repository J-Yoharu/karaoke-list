<template>
  <div>
    <musics-table
      search-placeholder="Pesquise em suas músicas favoritas"
      :musics="musics"
      :pagination="pagination"
      :disable-pagination="false"
    >
      <template #item.favority="{ props }">
        <v-btn icon @click="removeFavority(props.item)">
          <v-icon>{{ icons.mdiTrashCan }}</v-icon>
        </v-btn>
      </template>
    </musics-table>
  </div>
</template>

<script>
import MusicsTable from '@/components/MusicsTable.vue'
import { computed, ref } from '@vue/composition-api'
import { mdiTrashCan } from '@mdi/js'

export default {
  components: {
    MusicsTable,
  },
  setup(props, { refs }) {
    const icons = {
      mdiTrashCan,
    }

    const musics = ref(localStorage.favorities ? JSON.parse(localStorage.favorities) : [])

    const pagination = computed(() => {
      return {
        to: musics.value.length,
        total: musics.value.length,
      }
    })

    const removeFavority = music => {
      let removeIndex = musics.value.findIndex(m => music.id == m.id)
      musics.value.splice(removeIndex, 1)
      localStorage.setItem('favorities', JSON.stringify(musics.value))
    }

    return {
      musics,
      pagination,
      icons,
      removeFavority,
    }
  },
}
</script>

<style></style>
