<template>
<v-card>
  <v-row justify="end" class="pa-2" align="center">
    <slot name="header-actions"></slot>
    <v-col cols="12" md="6" v-if="hasSearch" class="d-flex text-right align-center">
          <v-text-field
            v-model="query"
            :append-icon="icons.mdiMagnify"
            @click:append="$emit('search', query)"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            :placeholder="searchPlaceholder"
            @keyup.enter="$emit('search', query)"
          ></v-text-field>
        </v-col>
  </v-row>
  <v-data-table :search="query" :group-by="groupBy" :items-per-page="itemsPerPage" :items="items" :headers="headers">

    <template #group.header="{ group, groupBy }">
      <td colspan="12" class="text-center">
        <div> {{headers.find(h => h.value == groupBy).text}}: {{group}}</div>
      </td>
    </template>
  </v-data-table>
</v-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiMagnify } from '@mdi/js'

export default {
  props: {
    // musics: {
    //   required: true,
    //   type: Array,
    // },
    itemsPerPage: {
      type: Number,
      default: 50,
    },
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    groupBy: {
      type: String,
      default: undefined,
    },
    searchPlaceholder: {
      type: String,
      default: '',
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const icons = {
      mdiMagnify,
    }

    const query = ref('')

    return {
      query,
      icons,
    }
  },
}
</script>

<style>
</style>
