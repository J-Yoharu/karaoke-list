<template>
  <div>
    <musics-table :musics="musics" search-placeholder="Pesquise uma atualização">
    </musics-table>
  </div>
</template>

<script>
import MusicsTable from '@/components/MusicsTable.vue'

export default {
  components: {
    MusicsTable,
  },

  setup() {
    const musics = [
      {
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
        first: true,
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
        singer: 'Alfredo',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Brener',
        cod: 1452,
        title: 'Brenão',
        initial: 'Assim começou o nosso amor querido, meu amor',
        first: true,
      },
      {
        singer: 'Bruno',
        cod: 1452,
        title: 'Brenão',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
      {
        singer: 'Frederico',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
        first: true,
      },
      {
        singer: 'Francisco',
        cod: 1235,
        title: 'Alfredex louco',
        initial: 'Assim começou o nosso amor querido, meu amor',
      },
    ]

    return {
      musics,
    }
  },
}
</script>

