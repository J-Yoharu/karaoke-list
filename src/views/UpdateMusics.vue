<template>
  <div class="h-full">
    <upload-area v-if="!file" :acceptMimes="['.xlsx']" v-model="file" class="h-full"></upload-area>
    <excel-upload-stepper v-else :file="file"></excel-upload-stepper>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import UploadArea from '@/components/UploadArea.vue'
import FilePresenter from '@/components/FilePresenter.vue'
import ExcelUploadStepper from '@/components/ExcelUploadStepper.vue'

export default {
  components: {
    UploadArea,
    FilePresenter,
    ExcelUploadStepper,
  },
  setup() {
    const file = ref(null)

    return {
      file,
    }
  },
}
</script>

<style scoped>
.update {
  border: 1px dashed black;
}
</style>
