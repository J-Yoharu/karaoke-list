<template>
    <app-table no-data-text="Não há dados na sua planilha" :loading="isLoading" :mobileBreakPoint="0" :hide-default-header="true" searchPlaceholder="buscar na sua planilha" :headers="dataTablePreview.headers" :items="dataTablePreview.items">
        <template #header>
            <thead class="v-data-table-header">
                <tr>
                <th :colspan="isMobile && header.edit ? 12:1" v-show="showFullHeaderInMobile(header)" :aria-label="`${header.text}`" class="text-start" :key="i" v-for="(header,i) in dataTablePreview.headers">
                    <v-text-field autofocus @keypress.enter="closeEditHeader(header)"  @click:append="closeEditHeader(header)"  @blur="closeEditHeader(header)" :append-icon="icons.mdiPlus" dense hide-details="auto" outlined v-if="showEditHeader(header)" v-model="header.text" :label="header.text">  </v-text-field>
                    <span @click="editHeader(header)" v-else> {{header.text}} </span>
                </th>   
                </tr>
            </thead>
        </template>

        <template #header-append>
            <v-row>
                <v-col cols="12" md="3">
                    <v-autocomplete :disabled="isLoading" :loading="isLoading" auto-select-first outlined dense hide-details autofocus label="Selecione uma planilha" v-model="selectedSheet" @change="loadPreview" :items="sheets" item-text="name" item-value="id"></v-autocomplete>
                </v-col>

                <slot name="save">
                     <v-col cols="12" md="3">
                        <v-btn color="primary" @click="save">
                            Salvar
                        </v-btn>
                    </v-col>
                </slot>
               
            </v-row>
        </template>

        <!-- <template #header-append>
            <v-col cols="auto" class="d-flex justify-end">
           

            </v-col>
        </template> -->
    </app-table>
</template>

<script>
import {
  reactive, ref, watch, onBeforeMount,
} from '@vue/composition-api'
import AppTable from '@core/components/tables/app-table.vue'
import { mdiPlus } from '@mdi/js'
import { isMobile } from '@/helpers/breakpoint'
import Excel from '@/helpers/Excel'

export default {
  components: {
    AppTable,
  },
  props: {
    file: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const { file } = props
    let excel = null
    const editname = ref('')
    const sheets = ref([])
    const selectedSheet = ref(null)
    const isLoading = ref(false)

    const icons = {
      mdiPlus,
    }
    const dataTablePreview = reactive({
      headers: [],
      items: [],
    })

    watch(
      () => props.file,
      async () => {
        loadExcel(file)
      },
    )

    watch(selectedSheet, () => {
      loadPreview()
    })

    const edit = (header, event) => {
      console.log({ event })
    }

    const loadExcel = file => {
      isLoading.value = true
      new Excel(file)
        .build()
        .then(res => {
          excel = res
          sheets.value = excel.sheets
          if (sheets.value.length) selectedSheet.value = 1
        })
        .catch(error => {
          console.log({ error })
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    const loadPreview = () => {
      isLoading.value = true

      excel
        .selectWorksheetById(selectedSheet.value)
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
        .finally(() => {
          isLoading.value = false
        })
    }

    const save = () => {
      if (dataTablePreview.headers.every(header => header.text == header.value)) return emit('save', dataTablePreview.items)

      const formattedItems = dataTablePreview.items.map(item => {
        const newItem = {}
        const values = Object.values(item)

        dataTablePreview.headers.forEach((header, i) => (newItem[header.text] = values[i]))

        return newItem
      })

      emit('save', formattedItems)
    }

    const editHeader = header => {
      editname.value = header.text
      header.edit = true
    }

    const closeEditHeader = header => {
      header.edit = false
      editname.value = null
    }

    const showEditHeader = header => editname == header.text || header.edit == true

    const showFullHeaderInMobile = header => (isMobile.value && editname.value && !header.edit ? editname.value == header.text : true)

    onBeforeMount(() => {
      loadExcel(file)
    })

    return {
      excel,
      editname,
      dataTablePreview,
      edit,
      selectedSheet,
      sheets,
      icons,
      isLoading,

      isMobile,
      loadPreview,
      loadExcel,
      editHeader,
      closeEditHeader,
      showEditHeader,
      showFullHeaderInMobile,
      save,
    }
  },
}
</script>

<style>
</style>