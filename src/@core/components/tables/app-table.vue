<template>
  <v-card class="pa-2">
    <slot name="header-prepend"> </slot>
    <v-row justify="end" align="center">
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
    <slot name="header-append"> </slot>
    <v-data-table
      :no-data-text="noDataText"
      :mobile-breakpoint="mobileBreakPoint"
      :hide-default-header="hideDefaultHeader"
      :search="query"
      :group-by="groupBy"
      :items-per-page="itemsPerPage"
      :items="items"
      :headers="headers"
      :disable-pagination="disablePagination"
      :hide-default-footer="true"
    >
      <template #group.header="{ group, groupBy }">
        <td colspan="12" class="text-center">
          <div>{{ headers.find(h => h.value == groupBy).text }}: {{ group }}</div>
        </td>
      </template>

      <template #[getSlotName(slot)]="props" v-for="slot in computedSlots">
        <slot :props="{ ...props }" :name="slot.fullSlotName"></slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
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
    hideDefaultHeader: {
      type: Boolean,
      default: false,
    },
    mobileBreakPoint: {
      type: Number,
      default: 600,
    },
    noDataText: {
      type: String,
      default: undefined,
    },
    disablePagination: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const icons = {
      mdiMagnify,
    }

    const query = ref('')

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

    const getSlotName = slot => (slot.name ? `${slot.prefix}.${slot.name}` : `${slot.fullSlotName}`)

    return {
      query,
      icons,
      computedSlots,
      getSlotName,
    }
  },
}
</script>

<style></style>
