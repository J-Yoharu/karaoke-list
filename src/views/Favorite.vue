<template>
  <div>
    <musics-table
      search-placeholder="Pesquise em suas músicas favoritas"
      :musics="musics"
      :pagination="pagination"
      :disable-pagination="true"
      @remove:favorite="removeFavorite"
      :remove-favorite-icon="icons.mdiTrashCan"
      remove-favorite-icon-color="error"
    >
      <template #item.favority="{ props }">
        <v-btn icon @click="removeFavorite(props.item)">
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

    const removeFavorite = ({ index }) => musics.value.splice(index, 1)

    return {
      musics,
      pagination,
      icons,
      removeFavorite,
    }
  },
}
</script>

<style></style>
