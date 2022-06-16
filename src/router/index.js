import authRoutes from '@/router/auth.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      search: false,
      title: 'Home',
    },
  },
  {
    path: '/pesquisa',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    meta: {
      search: false,
      title: 'Pesquisa',
    },
  },
  {
    path: '/favoritos',
    name: 'favorite',
    component: () => import('@/views/Favorite.vue'),
    meta: {
      title: 'Favoritos',
    },
  },
  {
    path: '/atualizacoes',
    name: 'update',
    component: () => import('@/views/Update.vue'),
    meta: {
      title: 'Atualizações',
    },
  },
  {
    path: '/musicas',
    name: 'all-musics',
    component: () => import('@/views/AllMusics.vue'),
    meta: {
      title: 'Todas músicas',
    },
  },
  {
    path: '/atualizar-musicas',
    name: 'update-musics',
    component: () => import('@/views/UpdateMusics.vue'),
    meta: {
      title: 'Atualizar banco',
    },
  },
  {
    path: '/perfil',
    name: 'user-profile',
    component: () => import('@/views/UserProfile.vue'),
    meta: {
      title: 'Perfil',
    },
  },
  ...authRoutes,
  {
    path: '*',
    component: () => import('@/views/Error404.vue'),
    meta: {
      layout: 'blank',
      title: 'Página não encontrada',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  let appName = process.env.VUE_APP_NAME ? process.env.VUE_APP_NAME : 'Lista de músicas'
  if (to.meta.title) {
    window.document.title = `${to.meta.title} | ${appName}`
    return next()
  }
  window.document.title = appName
  next()
})
export default router
