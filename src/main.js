// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import {TransferDom, querystring} from 'vux'
import 'normalize.css'
import VueLazyload from 'vue-lazyload'
import 'interceptors/interceptor'
import axios from 'axios'
import PullToRefreshDirective from 'assets/js/pullToRefreshDirective'
import 'assets/js/iNoBounce'
import ShumsgToastPlugin from 'assets/js/shumsgToastPlugin'

Object.defineProperty(Vue.prototype, '$axios', {value: axios});
Object.defineProperty(Vue.prototype, '$querystring', {value: querystring});

//重新封装toast, type可为success/warning/error, width请设为偶数，否则由于居中方式的问题可能将导致模糊
Vue.use(ShumsgToastPlugin);

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
