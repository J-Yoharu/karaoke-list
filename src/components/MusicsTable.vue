<template>
  <div style="position: relative">
    <div class="text-end">Resultados: {{ pagination.to }} / {{ pagination.total }}</div>
    <app-table
      class="w-full"
      :hasSearch="hasSearch"
      :groupBy="groupBy"
      :items="musics"
      :headers="headers"
      :search-placeholder="searchPlaceholder"
    >
      <template #[`item.singer`]="{ props }"> {{ props.value }} </template>
      <template #header-actions>
        <v-col :class="{ 'pb-0': $vuetify.breakpoint.mobile }">
          <v-btn :block="$vuetify.breakpoint.mobile" color="primary" @click="group">Agrupar por cantor</v-btn>
        </v-col>
      </template>

      <template #[`${slot.prefix}.${slot.name}`]="{ props }" v-for="slot in computedSlots">
        <slot :name="slot.fullSlotName" :props="{ ...props }"></slot>
      </template>

      <template #footer>
        <v-pagination
          v-model="pagination.current"
          @input="$emit('pagination', pagination.current)"
          total-visible="8"
          class="my-4"
          :length="pagination.lastPage"
        ></v-pagination>
      </template>
    </app-table>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import appTable from '@core/components/tables/app-table.vue'
import { isMobile } from '@/helpers/breakpoint'

export default {
  components: {
    appTable,
  },
  props: {
    musics: {
      required: true,
      type: Array,
    },
    itemsPerPage: {
      type: Number,
      default: 50,
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    searchPlaceholder: {
      type: String,
      default: 'Pesquise por cantor ou música',
    },
    pagination: {
      type: Object,
    },
  },
  setup(props, { slots }) {
    const headers = [
      {
        text: 'Cantor',
        value: 'singer',
        width: '30%',
      },
      {
        text: 'Cod',
        value: 'id',
        groupable: false,
        width: '10%',
      },
      {
        text: 'Título',
        value: 'title',
        groupable: false,
        width: '20%',
      },
      {
        text: 'Inicio',
        value: 'begins',
        groupable: false,
        width: '40%',
      },
    ]

    const groupBy = ref(undefined)
    const group = () => {
      groupBy.value = groupBy.value ? undefined : 'singer'
    }

    const loading = ref(false)
    const query = ref('')
    const search = () => {}

    const computedSlots = computed(() =>
      Object.keys(slots).map(name => {
        const nameSeparator = name.split('.')

        return {
          prefix: nameSeparator.splice(0, 1),
          name: nameSeparator.join('.'),
          fullSlotName: name,
        }
      }),
    )

    return {
      headers,
      groupBy,
      group,

      search,
      query,
      loading,
      computedSlots,
      isMobile,
    }
  },
}
</script>

<style scoped lang="scss">
::v-deep {
  .v-data-table > .v-data-table__wrapper .v-data-table__mobile-table-row {
    border-bottom: 1px solid #b1abab;
  }
}
</style>
