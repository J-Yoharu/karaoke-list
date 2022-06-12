import { signIn } from '@/repositories/authRepository'
import appConfigStoreModule from '@core/@app-config/appConfigStoreModule'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      providerId: null,
      uid: null,
      displayName: null,
      email: null,
      phoneNumber: null,
      photoURL: null,
      emailVerified: null,
      isAnonymous: null,
      createdAt: null,
      lastLoginAt: null,
      apiKey: null,
      appName: null,
      token: {
        refreshToken: null,
        accessToken: null,
        expirationTime: null,
      },
    },
  },
  mutations: {
    user(state, data) {
      let userIndexes = ['uid', 'emailVerified', 'isAnonymous', 'createdAt', 'lastLoginAt', 'apiKey', 'appName']

      const {
        providerData: { 0: user },
        stsTokenManager: token,
      } = data.user

      userIndexes.forEach(index => (user[index] = data.user[index]))

      localStorage.user = JSON.stringify(user)
      localStorage.token = JSON.stringify(token)

      state.user = user
    },
  },
  actions: {
    signIn(context, data = {}) {
      let { skipRequest, email, password } = data

      if (skipRequest)
        return new Promise((res, rej) => {
          context.commit('user', data)
          res(data)
        })

      return signIn(email, password).then(res => context.commit('user', res))
    },
  },
  modules: {
    appConfig: appConfigStoreModule,
    app,
  },
})
