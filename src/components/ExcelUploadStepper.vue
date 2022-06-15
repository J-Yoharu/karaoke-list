<template>
<v-card class="pa-3" elevation="0">
  <v-row>
    <v-col>
      <div v-if="form.selectedSheet">
        <b>planilha selecionada</b>: {{form.selectedSheet}}

      </div>
    </v-col>
    <v-col cols="12">
      <v-stepper elevation="0" v-model="step" >
      <v-stepper-header>
         <v-divider ></v-divider>
          <v-stepper-step
          step="1"
          :complete="step > 1"
          editable
          >
            <small> Escolha uma planilha </small>
          </v-stepper-step>
         <v-divider ></v-divider>
          <v-stepper-step
          step="2"
          :complete="step > 2"
          editable
          >
            <small> Preview </small>
          </v-stepper-step>
         <v-divider ></v-divider>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1" >
          <v-card elevation="0" width="500" class="mx-auto">
            <v-row>
              <v-col cols="12">
                <v-autocomplete auto-select-first autofocus label="Selecione uma planilha" v-model="form.selectedSheet" :items="sheets" item-text="name" item-value="id"></v-autocomplete>
              </v-col>
            </v-row>
          </v-card>
        </v-stepper-content>

         <v-stepper-content step="2" >
            <v-row justify="center">
              <v-col cols="12" md="10">
                <app-table :mobileBreakPoint="0" :hide-default-header="true" searchPlaceholder="buscar na sua planilha" :headers="dataTablePreview.headers" :items="dataTablePreview.items">
                  <template #header>
                    <thead class="v-data-table-header">
                      <tr>
                        <th :colspan="isMobile && header.edit ? 12:1" v-show="isMobile && editname && !header.edit ? editname == header.text: true" :aria-label="`${header.text}`" class="text-start" :key="i" v-for="(header,i) in dataTablePreview.headers">
                          <v-text-field autofocus @click:append="header.edit = false; editname = null" :append-icon="icons.mdiPlus" dense hide-details="auto" @blur="header.edit = false; editname = null" outlined v-if="editname == header.text || header.edit == true" v-model="header.text" :label="header.text">  </v-text-field>
                          <span @click="editname = header.text; header.edit = true" v-else> {{header.text}} </span>
                        </th>
                      </tr>
                    </thead>
                  </template>
                </app-table>
              </v-col>
            </v-row>
        </v-stepper-content>
      </v-stepper-items>
      <v-card-actions class="d-flex">
        <v-btn color="secondary" @click="step--" :disable="step == 1">Voltar</v-btn> <v-spacer></v-spacer> <v-btn :disable="step == 3" @click="step++" color="primary">Próximo</v-btn>
      </v-card-actions>
      </v-stepper>
    </v-col>
  </v-row>

</v-card>
</template>

<script>
import {
  watch, ref, onBeforeMount, reactive, computed,
} from '@vue/composition-api'
import { mdiPlus } from '@mdi/js'
import AppTable from '@core/components/tables/app-table.vue'
import Excel from '@/helpers/Excel'
import { isMobile } from '@/helpers/breakpoint'

export default {
  props: {
    file: {
      required: true,
    },
  },
  components: {
    AppTable,
  },
  setup(props) {
    const { file } = props

    const step = ref(1)
    const sheets = ref([])
    const form = reactive({
      selectedSheet: null,
      rows: [],
    })
    const editname = ref('')

    let excel = null
    const dataTablePreview = reactive({
      headers: [],
      items: [],
    })

    const edit = (header, event) => {
      console.log({ event })
    }

    const loadExcel = async file => {
      excel = await new Excel(file).build()
      sheets.value = excel.sheets
    }
    const loadPreview = () => {
      excel
        .selectWorksheetById(form.selectedSheet)
        .toJson()
        .then(res => {
          if (!res.length) {
            console.log('Não há dados nessa planilha')

            return
          }
          dataTablePreview.items = res
          dataTablePreview.headers = Object.keys(res[0]).map(header => ({
            text: header,
            value: header,
            sortable: false,
            edit: false,
          }))
        })
        .catch(err => console.log(err))
    }

    onBeforeMount(() => {
      loadExcel(file)
    })

    const icons = {
      mdiPlus,
    }

    watch(
      () => props.file,
      async () => {
        loadExcel(file)
      },
    )

    watch(step, () => {
      if (step.value == 2) {
        loadPreview()
      }
    })

    return {
      sheets,
      excel,
      step,
      form,
      icons,
      dataTablePreview,
      isMobile,
      editname,
      edit,
    }
  },
}
</script>

<style>
</style>
