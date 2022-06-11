export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/registro',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/redefinir-senha',
    name: 'reset-password',
    component: () => import('@/views/ResetPassword.vue'),
    meta: {
      layout: 'blank',
    },
  },
]
