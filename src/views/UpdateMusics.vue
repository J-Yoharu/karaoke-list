<template>
  <div class="h-full">
    <upload-area v-if="!file" :acceptMimes="['.xlsx']" v-model="file" class="h-full"></upload-area>
    <excel-table v-else :file="file" @save="saveData"></excel-table>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import UploadArea from '@/components/UploadArea.vue'
import FilePresenter from '@/components/FilePresenter.vue'
import ExcelTable from '@/components/ExcelTable.vue'
import { createMusic } from '@/repositories/musicRepository'

export default {
  components: {
    UploadArea,
    FilePresenter,
    ExcelTable,
  },
  setup() {
    const file = ref(null)

    const saveData = items => {
      console.log({ items })
      createMusic(items, 'cod')
        .then(res => {
          console.log({ res })
        })
        .catch(error => {
          console.log({ error })
        })
    }

    return {
      file,
      saveData,
    }
  },
}
</script>

<style scoped>
.update {
  border: 1px dashed black;
}
</style>
