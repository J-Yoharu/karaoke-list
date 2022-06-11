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
      layout: 'content',
    },
  },
  {
    path: '/favoritos',
    name: 'favorite',
    component: () => import('@/views/Update.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/atualizacoes',
    name: 'update',
    component: () => import('@/views/Favorite.vue'),
    meta: {
      layout: 'content',
    },
  },
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
