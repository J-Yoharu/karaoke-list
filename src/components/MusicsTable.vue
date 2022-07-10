<template>
  <div style="position: relative">
    <div class="text-end" v-if="pagination">Resultados: {{ pagination.to }} / {{ pagination.total }}</div>
    <app-table
      class="w-full"
      :hasSearch="hasSearch"
      :groupBy="groupBy"
      :items="musics"
      :headers="headers"
      :search-placeholder="searchPlaceholder"
      :disable-pagination="disablePagination"
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

      <template #item.favority="{ props }">
        <v-btn
          icon
          v-if="isFavority(props.item)"
          :color="removeFavoriteIconColor"
          @click="removeToFavority(props.item)"
        >
          <v-icon>{{ removeFavoriteIcon }}</v-icon>
        </v-btn>

        <v-btn v-else icon @click="addToFavority(props.item)">
          <v-icon>{{ icons.mdiStar }}</v-icon>
        </v-btn>
      </template>

      <template #footer>
        <v-pagination
          v-if="!disablePagination"
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
import { mdiStar } from '@mdi/js'

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
    disablePagination: {
      type: Boolean,
      default: false,
    },
    removeFavoriteIcon: {
      default: mdiStar,
    },
    removeFavoriteIconColor: {
      type: String,
      default: 'warning',
    },
  },
  setup(props, { slots, emit }) {
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
      {
        text: 'Favoritar',
        value: 'favority',
        groupable: false,
        width: '20%',
      },
    ]
    const icons = {
      mdiStar,
    }

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

    const favorities = ref(localStorage.favorities ? JSON.parse(localStorage.favorities) : [])

    const isFavority = music => {
      return favorities.value.find(m => music.id == m.id) ? true : false
    }

    const addToFavority = music => {
      favorities.value.push(music)
      localStorage.favorities = JSON.stringify(favorities.value)
      emit('add:favorite', { music })
    }

    const removeToFavority = music => {
      let removeIndex = favorities.value.findIndex(m => music.id == m.id)
      favorities.value.splice(removeIndex, 1)
      localStorage.setItem('favorities', JSON.stringify(favorities.value))
      emit('remove:favorite', { music, index: removeIndex })
    }

    return {
      headers,
      icons,
      groupBy,
      group,

      search,
      query,
      loading,
      computedSlots,
      isMobile,

      favorities,
      addToFavority,
      removeToFavority,
      isFavority,
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
