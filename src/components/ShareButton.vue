<template>
  <div>
    <!-- Work just https
        Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
        Feature: Add archive to share, ex: PDF, image etc...
        * Share Website
        * Share my favorities songs
     -->
    <v-btn @click="shareInfo" :text="text" :icon="icon" small v-if="showButton">
      <slot>
        <span v-if="!icon"> Compartilhar </span>
      </slot>

      <v-icon :class="{ text: 'ml-2' }">
        <slot name="icon">
          {{ icons.mdiShareVariant }}
        </slot>
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiShareVariant } from '@mdi/js'

export default {
  props: {
    text: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    share: {
      type: Object,
      default() {
        return {
          title: 'Lista de Música',
          text: 'O melhor lugar para encontrar suas músicas favoritas',
          url: process.env.BASE_URL,
          files: [],
        }
      },
    },
  },
  setup(props, { emit }) {
    const icons = {
      mdiShareVariant,
    }

    const showButton = ref(false)

    if (navigator.canShare) {
      showButton.value = true
    }

    const shareInfo = () => {
      navigator
        .share(props.share)
        .then(res => emit('success', res))
        .catch(error => emit('error', error))
    }
    return { icons, showButton, shareInfo }
  },
}
</script>

<style></style>
