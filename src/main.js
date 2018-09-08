// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import {TransferDom, ToastPlugin} from 'vux'
import 'normalize.css'
import VueLazyload from 'vue-lazyload'
import 'interceptors/interceptor'

Vue.use(ToastPlugin)

Vue.directive('transfer-dom', TransferDom)

import FastClick from 'assets/js/fastclick'

FastClick.attach(document.body)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 5
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
