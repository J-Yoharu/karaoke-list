<template>
  <div class="h-full">
    <upload-area v-if="!file" :acceptMimes="['.xlsx']" v-model="file" class="h-full"></upload-area>
    <v-card v-else>
      <v-row>
        <v-col>
          Seu arquivo
        </v-col>
        <v-col>
          <v-autocomplete :items="sheets"></v-autocomplete>

        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import UploadArea from '@/components/UploadArea.vue'
import Excel from '@/helpers/Excel'

export default {
  components: {
    UploadArea,
  },
  setup() {
    const file = ref(null)
    const sheets = ref([])
    watch(file, async () => {
      console.log(file)
      const excel = await new Excel(file.value).build()

      sheets.value = excel.sheets

      // excel.toJson({
      //   headers: ['singer', 'cod', 'title'],
      //   headerIndex: 1,
      // });
    })

    return {
      file,
      sheets,
    }
  },
}
</script>

<style scoped>
.update {
  border: 1px dashed black;
}
</style>
