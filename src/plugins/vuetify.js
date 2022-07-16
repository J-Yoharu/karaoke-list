import preset from '@/@core/preset/preset'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt: require('vuetify/lib/locale/pt').default },
    current: 'pt',
  },
  preset,
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
  },
})
