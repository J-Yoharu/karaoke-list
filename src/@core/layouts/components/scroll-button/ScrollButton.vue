<template>
  <v-btn v-if="visible" color="rgba(0, 0, 255, 0.6)" fab class="scroll-button" id="scroll"> <v-icon large>{{ icons.mdiChevronUp }}</v-icon> </v-btn>
</template>

<script>
import { mdiChevronUp } from '@mdi/js'
import { onMounted, ref } from '@vue/composition-api'
import { getScrollPercentDistance } from '@/helpers/scroll.js'

export default {
  setup() {
    const icons = {
      mdiChevronUp,
    }
    const visible = ref(false)

    onMounted(() => {
      const element = document.querySelector('.app-content-container')
      element.addEventListener('scroll', event => {
        console.log('teste')
      })

      // const element = document.querySelector('.app-content-container')
      // element.addEventListener('whell', event => {
      //   console.log('aqui')

      // const percent = getScrollPercentDistance(element)
      // if (percent > 20) return (visible.value = true)

      // return (visible.value = false)
      // })
    })

    return {
      icons,
      visible,
    }
  },
}
</script>

<style scoped>
.scroll-button {
  position: fixed;
  bottom: 10%;
  right: 5%;
  color: rgba(0, 0, 255, 0.352);
}
</style>
