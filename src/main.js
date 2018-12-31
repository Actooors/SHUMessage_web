// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import {TransferDom, ToastPlugin} from 'vux'
import 'normalize.css'
import VueLazyload from 'vue-lazyload'
import 'interceptors/interceptor'
import axios from 'axios'
import PullToRefreshDirective from 'assets/js/pullToRefreshDirective'
import 'assets/js/iNoBounce'
// iNoBounce.enable();

Object.defineProperty(Vue.prototype, '$axios', {value: axios})

Vue.use(ToastPlugin)

Vue.directive('transfer-dom', TransferDom)
Vue.directive('pull-to-refresh', PullToRefreshDirective)

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
  render: h => h(App),
  // mounted() {
  //   告知prerender-spa-plugin可以移除骨架屏了
  // document.dispatchEvent(new Event('render-event'));
  // document.getElementById('prerender').remove();
  // }
}).$mount('#app-box')
