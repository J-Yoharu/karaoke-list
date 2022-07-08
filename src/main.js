import '@/bootstrap'
import '@/directives'
import '@/plugins/vue-composition-api'
import '@/registerServiceWorker'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import './plugins/alert'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
