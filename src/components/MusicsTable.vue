<template>
<div style="position:relative" class="d-flex">
  <app-table class="w-full" :hasSearch="hasSearch" :groupBy="groupBy" :items="musics" :headers="headers" :search-placeholder="searchPlaceholder">
    <template #header-actions>
      <v-col :class="{'pb-0': $vuetify.breakpoint.mobile}">
        <v-btn :block="$vuetify.breakpoint.mobile" color="primary" @click="group">Agrupar por cantor</v-btn>
      </v-col>
    </template>

     <template #item.singer="{ props }">
      <div style="position:relative" :id="props.value[0].toUpperCase()">
        <!-- v-observe:[props.value[0].toUpperCase()]="observe" -->
        <transition name="fade">
          <v-chip color="primary" v-if="props.item.first && letterChipVisible" :style="isMobile ? 'left:105%': ''" class="letter-chip">

            {{props.value[0].toUpperCase()}}
          </v-chip>
        </transition>

        {{props.value}}
      </div>
    </template>

    <template #[`${slot.prefix}.${slot.name}`]="{props}" v-for="slot in computedSlots">
          <slot :name="slot.fullSlotName" :props="{...props}" ></slot>
    </template>

  </app-table>
  <div>
    <div class="scroll-info">
      <div v-for="letter in letters" :id="`letter-${letter}`" class="letter">
       <a class="undecorate" :href="`#${letter}`">{{letter}}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  ref, computed, onMounted, onUnmounted,
} from '@vue/composition-api'
import appTable from '@core/components/tables/app-table.vue'
import { getLetters } from '@/helpers'
import { isMobile } from '@/helpers/breakpoint'
import { monitoringScroll } from '@/helpers/scroll'

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
        value: 'cod',
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
        value: 'initial',
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

    const letters = getLetters()

    const computedSlots = computed(() => Object.keys(slots).map(name => {
      const nameSeparator = name.split('.')

      return {
        prefix: nameSeparator.splice(0, 1),
        name: nameSeparator.join('.'),
        fullSlotName: name,
      }
    }))

    const letterChipVisible = ref(false)
    const eventListener = monitoringScroll(
      window,
      isScrolling => {
        letterChipVisible.value = isScrolling
      },
      500,
    )

    onUnmounted(() => {
      window.removeEventListener('scroll', eventListener)
    })

    // const observe = (isVisible, { arg }) => {
    //   const element = document.getElementById(arg)
    //   console.log(element)
    //   if (isVisible) {
    //     const el = document.querySelector('.active')
    //     if (el) el.classList.remove('active')

    //     element.classList.add('active')
    //   }

    //   // element.classList.remove('active')
    // }

    return {
      headers,
      groupBy,
      group,

      search,
      query,
      loading,
      computedSlots,
      letters,
      isMobile,

      // observe,
      letterChipVisible,
    }
  },
}
</script>

<style scoped>
.scroll-info {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 10px;
  text-align: center;
}
.letter {
  padding: 3% 0 3% 0;
}
.letter:hover {
  cursor: pointer;
  transform: scale(2, 2);
}
.letter-chip {
  position: absolute;
  left: -17%;
  top: -20%;
  z-index: 10;
}
</style>
