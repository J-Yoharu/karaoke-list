<template>
  <v-btn
    @click="toTop"
    style="z-index:4"
    v-if="visible"
    color="primary"
    :small="$vuetify.breakpoint.mobile"
    fab
    class="scroll-button"
    >
      <v-icon large>{{ icons.mdiChevronUp }}</v-icon>
    </v-btn>
</template>

<script>
import { mdiChevronUp } from '@mdi/js'
import { onMounted, ref } from '@vue/composition-api'
import { getScrollPercentDistance, scrollToTop } from '@/helpers/scroll.js'

export default {
  props: {
    minPercent: {
      type: Number,
      default: 20,
    },
  },
  setup(props) {
    const elementScroll = window.document.body.parentNode
    const icons = {
      mdiChevronUp,
    }
    const visible = ref(false)

    const toTop = () => {
      scrollToTop(elementScroll)
    }

    onMounted(() => {
      window.addEventListener('scroll', () => {
        const percent = getScrollPercentDistance(elementScroll) // <html>
        if (percent > props.minPercent) return (visible.value = true)

        return (visible.value = false)
      })
    })

    return {
      icons,
      visible,
      toTop,
    }
  },
}
</script>

<style scoped>
.scroll-button {
  position: fixed;
  bottom: 10%;
  right: 5%;
  opacity: 0.7;
}
</style>
