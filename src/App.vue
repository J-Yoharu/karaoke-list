<template>
  <component :is="resolveLayoutVariant" :class="`skin-variant--${appSkinVariant}`">
    <transition :name="appRouteTransition" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </component>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { computed, onMounted } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import useAppConfig from '@core/@app-config/useAppConfig'
import { useRouter } from '@core/utils'
import { useLayout } from '@core/layouts/composable/useLayout'

// Layouts
import useDynamicVh from '@core/utils/useDynamicVh'
import LayoutContentVerticalNav from '@/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue'
import LayoutContentHorizontalNav from '@/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav.vue'
import LayoutBlank from '@/layouts/variants/blank/LayoutBlank.vue'

import { setTimeoutExpirationTime } from '@/plugins/auth/index'
import store from '@/store'
import { index } from '@/repositories/musicRepository'

// Dynamic vh

export default {
  components: {
    LayoutContentVerticalNav,
    LayoutContentHorizontalNav,
    LayoutBlank,
  },
  setup() {
    const { route } = useRouter()
    const { appContentLayoutNav, appSkinVariant, appRouteTransition } = useAppConfig()

    const { handleBreakpointLayoutSwitch } = useLayout()
    handleBreakpointLayoutSwitch()

    const resolveLayoutVariant = computed(() => {
      const { layout } = route.value.meta
      switch (layout) {
        case 'blank':
          return 'layout-blank'
        default:
          return `layout-content-${appContentLayoutNav.value}-nav`
      }
    })

    useDynamicVh()

    onMounted(() => {
      migrateOldFavoritiesSongs()

      if (!store.state.user.token) return

      const { expirationTime } = store.state.user.token

      setTimeoutExpirationTime(expirationTime, ms => {
        store.dispatch('signOut')
      })
    })

    const migrateOldFavoritiesSongs = () => {
      if (localStorage.favorities) return

      let musicsDb = JSON.parse(localStorage.dbKaraoke)

      const ids = musicsDb.filter(music => music.favorite == true).map(music => music.cod)

      index({ ids, withOutPagination: true }).then(({ data }) => {
        localStorage.setItem('favorities', JSON.stringify(data))
        localStorage.setItem('favoritiesIds', JSON.stringify(ids))
        localStorage.removeItem('dbKaraoke')
      })
    }

    return {
      resolveLayoutVariant,
      appSkinVariant,
      appRouteTransition,
      migrateOldFavoritiesSongs,
    }
  },
}
</script>
