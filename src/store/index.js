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
    user(state, user) {
      state.user = user
    },
  },
  actions: {
    signIn(context, data) {
      let userIndexes = ['uid', 'emailVerified', 'isAnonymous', 'createdAt', 'lastLoginAt', 'apiKey', 'appName']

      const {
        providerData: { 0: user },
        stsTokenManager: token,
      } = data.user

      userIndexes.forEach(index => (user[index] = data.user[index]))

      context.commit('user', { ...user, token })

      localStorage.user = JSON.stringify(user)
      localStorage.token = JSON.stringify(token)
    },
    signOut(context, data) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  modules: {
    appConfig: appConfigStoreModule,
    app,
  },
})
