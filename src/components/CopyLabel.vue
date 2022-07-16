<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div ref="copylabel" class="copylabel animate__faster" v-on="on" @click.stop.prevent="copy">
                {{ text }}
        </div>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  beforeDestroy() {},
  methods: {},

  setup(props, { parent }) {
    const timeout = ref(null)
    const tooltip = ref('Copiar')

    onUnmounted(() => {
      if (timeout.value) clearTimeout(timeout.value)
    })

    const copy = () => {
      navigator.clipboard.writeText(props.text)
      tooltip.value = 'Copiado!'

      timeout.value = setTimeout(() => {
        tooltip.value = 'Copiar'
      }, 2000)
    }

    return {
      timeout,
      tooltip,
      copy,
    }
  },
}
</script>

<style scoped>
.copylabel {
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px dashed;
}
</style>
