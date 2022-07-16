<template>
  <div
    style="position: relative; width: 100%"
    v-click-outside="{
      handler: hideSuggestions,
    }"
  >
    <v-text-field
      id="textfield-search"
      :class="{ textSearch: autocompleteResults.length && !disableAutocomplete && !hideAutocomplete }"
      placeholder="Pesquise por uma música ou cantor"
      clearable
      hide-details="auto"
      labgitel="Pesquisar"
      @keypress.enter="emitSearch(value)"
      @click:append="emitSearch(value)"
      :value="value"
      @focus="
        $emit('focus', $event)
        hideAutocomplete = false
      "
      @input="$emit('input', $event)"
      @keypress="$emit('keypress', $event)"
      @blur="$emit('blur', $event)"
      :append-icon="icons.mdiMagnify"
      solo
      outlined
      rounded
      dense
    >
    </v-text-field>
    <v-list
      class="list"
      dense
      v-show="!disableAutocomplete && !hideAutocomplete"
      v-if="autocompleteResults.length"
      outlined
      :class="{ 'autocomplete-absolute': autocompleteAbsolute }"
    >
      <v-list-item
        @click="clickItem(autocomplete)"
        dense
        link
        v-for="(autocomplete, i) in autocompleteResults"
        :key="i"
      >
        <p class="ma-0 pa-0">
          {{ autocomplete.result }}
          <span v-if="autocomplete.type == 'singer'">[ Cantor ]</span>
          <span v-else> [ Música ] </span>
        </p>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'

import { ref, watch } from '@vue/composition-api'
import { autocomplete } from '@/repositories/musicRepository'
import { debounce } from 'lodash'

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    debounceTime: {
      type: [Number, String],
      default: 200,
    },
    autocompleteAbsolute: {
      type: Boolean,
      default: false,
    },
    disableAutocomplete: {
      type: Boolean,
      default: false,
    },
    hideOnClickItem: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const autocompleteResults = ref([])
    const icons = {
      mdiMagnify,
    }
    const hideAutocomplete = ref(true)
    const hideSuggestions = () => {
      hideAutocomplete.value = true
    }

    const clickItem = item => {
      emit('click:item', item)
      if (props.hideOnClickItem) hideSuggestions()
    }

    const emitSearch = value => {
      emit('search', value)
      document.getElementById('textfield-search').blur()
      hideSuggestions()
    }
    watch(
      () => props.value,
      debounce(function (value) {
        if (props.disableAutocomplete) return
        if (value == null || value == '') return (autocompleteResults.value = [])
        autocomplete(value).then(resp => {
          autocompleteResults.value = resp.data
        })
      }, props.debounceTime),
    )
    return {
      icons,
      autocompleteResults,
      hideAutocomplete,
      hideSuggestions,
      clickItem,
      emitSearch,
    }
  },
}
</script>
<style lang="scss">
.textSearch {
  .v-input__control {
    .v-input__slot {
      fieldset {
        border: unset;
      }
    }
  }
  border-radius: 20px 20px 0 0 !important;
}
.list {
  border-radius: 0 0 20px 20px !important;
}
.autocomplete-absolute {
  position: absolute;
  z-index: 4;
  width: 100%;
}
</style>
