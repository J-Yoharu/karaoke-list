<template>
<v-img
  :class="{'mx-auto':center}"
  :src="appLogo"
  :width="width"
  :height="height"
  :max-height="maxHeight"
  :max-width="maxWidth"
  />
</template>

<script>
import themeConfig from '@themeConfig'

export default {
  props: {
    center: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    maxWidth: {
      type: String,
    },
    maxHeight: {
      type: String,
    },
  },
  setup() {
    const appLogo = themeConfig.app.logo

    return {
      appLogo,
    }
  },
}
</script>

<style>
</style>
