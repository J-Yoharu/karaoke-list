import { mdiCheckboxBlankCircleOutline } from '@mdi/js'

const themeConfig = {
  app: {
    name: 'Lista de músicas',
    logo: require('@/assets/images/Logo.png'),
    isDark: false,
    isRtl: false,
    contentLayoutNav: 'horizontal', // vertical, horizontal
    routeTransition: 'scroll-x-transition', // https://vuetifyjs.com/en/styles/transitions/#api
    // ! `semi-dark` isn't available for horizontal nav menu
    skinVariant: 'default', // default, bordered, semi-dark
    contentWidth: 'boxed', // full-width, boxed
  },
  menu: {
    isMenuHidden: false,
    isVerticalNavMini: false,
    verticalMenuAccordion: true,
    groupChildIcon: mdiCheckboxBlankCircleOutline,
    horizontalNavMenuGroupOpenOnHover: true,
  },
  appBar: {
    /*
    ! In Content Layout Horizontal Nav type `hidden` value won't work
    ! In Content Layout Horizontal Nav type value of `type` will affect both Appbar and Horizontal Navigation Menu
    */
    type: 'static', // fixed, static, hidden
    isBlurred: true,
  },
  footer: {
    type: 'static', // fixed, static, hidden
  },
  themes: {
    light: {
      primary: '#009df7',
      accent: '#0d6efd',
      secondary: '#8A8D93',
      success: '#56CA00',
      info: '#16B1FF',
      warning: '#FFB400',
      error: '#FF4C51',
    },
    dark: {
      primary: '#006db2',
      accent: '#0d6efd',
      secondary: '#8A8D93',
      success: '#56CA00',
      info: '#16B1FF',
      warning: '#FFB400',
      error: '#FF4C51',
    },
  },
}

export default themeConfig
