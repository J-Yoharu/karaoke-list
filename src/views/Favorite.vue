<template>
  <musics-table search-placeholder="Pesquise em suas músicas favoritas"></musics-table>
</template>

<script>
import MusicsTable from '@/components/MusicsTable.vue'

export default {
  components: {
    MusicsTable,
  },
  setup(props, { refs }) {},
}
</script>

<style>
</style>
