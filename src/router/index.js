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
    },
  },
  {
    path: '/pesquisa',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    meta: {
      search: false,
    },
  },
  {
    path: '/favoritos',
    name: 'favorite',
    component: () => import('@/views/Update.vue'),
  },
  {
    path: '/atualizacoes',
    name: 'update',
    component: () => import('@/views/Favorite.vue'),
  },
  ...authRoutes,
  {
    path: '*',
    component: () => import('@/views/Error404.vue'),
    meta: {
      layout: 'blank',
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

export default router
