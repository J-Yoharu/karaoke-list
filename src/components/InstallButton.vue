<template>
  <div>
    <!-- Work if service work is activate -->
    <v-btn @click="installApplication" :text="text" :icon="icon" small v-if="showButton">
      <slot>
        <span v-if="!icon"> Instalar Aplicativo </span>
      </slot>

      <v-icon :class="{ text: 'ml-2' }">
        <slot name="icon">
          {{ icons.mdiCellphoneArrowDown }}
        </slot>
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiCellphoneArrowDown } from '@mdi/js'
import { canInstall, install } from '@/pwa/installApplication'

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
  },
  setup(props, { emit }) {
    const icons = {
      mdiCellphoneArrowDown,
    }
    const showButton = ref(false)
    let installEvent = false

    canInstall(event => {
      installEvent = event
      showButton.value = true
    })

    const installApplication = () => {
      install(installEvent)
        .then(res => emit('success', res))
        .catch(error => emit('error', error))
    }

    return { icons, showButton, installApplication }
  },
}
</script>

<style></style>
