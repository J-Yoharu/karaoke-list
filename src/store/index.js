import { signIn } from '@/repositories/authRepository'
import appConfigStoreModule from '@core/@app-config/appConfigStoreModule'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.user ? JSON.parse(localStorage.user) : {},
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
  },
  actions: {
    signIn(context, data = {}) {
      let { skipRequest, email, password } = data

      if (skipRequest)
        return new Promise((res, rej) => {
          context.commit('user', data)
          localStorage.user = JSON.stringify(data)
          res(data)
        })

      return signIn(email, password).then(res => {
        const { data: user } = res.data
        localStorage.user = JSON.stringify(user)
        context.commit('user', user)
      })
    },
    signOut(context, data) {
      localStorage.removeItem('user')
      context.commit('user', {})
    },
  },
  modules: {
    appConfig: appConfigStoreModule,
    app,
  },
})
