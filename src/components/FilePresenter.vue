<template>
 <v-card @click="dialog = true" v-if="file" width="100" elevated class="hoverTranslate cursor-pointer">
    <v-icon size="100">{{ icons.mdiFile }}</v-icon>
    <div class="text-center">{{file.name}}</div>
    <v-dialog width="500" v-model="dialog">
      <v-card>
        <v-card-title class="d-flex align-center">
          {{file.name}} <v-spacer></v-spacer> <v-btn @click="dialog = false" fab small color="primary"> <v-icon >{{ icons.mdiClose }}</v-icon> </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              Tipo: <b>{{file.type}}</b>
            </v-col>
             <v-col cols="12">
               Tamanho: <b>{{file.size}} Bytes</b>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mdiFile, mdiClose } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  props: {
    file: {
      required: true,
    },
  },
  setup() {
    const icons = {
      mdiFile,
      mdiClose,
    }
    const dialog = ref(false)

    return {
      icons,
      dialog,
    }
  },
}
</script>

<style>
</style>
