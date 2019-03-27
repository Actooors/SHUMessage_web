// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import {TransferDom, querystring, ConfirmPlugin} from 'vux'
import 'normalize.css'
import VueLazyload from 'vue-lazyload'
import 'interceptors/interceptor'
import axios from 'axios'
import PullToRefreshDirective from 'assets/js/pullToRefreshDirective'
import 'assets/js/iNoBounce'
import ShumsgToastPlugin from 'assets/js/shumsgToastPlugin'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import preview from 'assets/js/vue-photo-preview'
import 'assets/js/vue-photo-preview/dist/skin.css'

Vue.use(preview, {
  shareEl: true,
  zoomEl: false,
  tapToToggleControls: false,
  tapToClose: true,
  loop: false,
  arrowEl: false,
  preload: [2, 2],
  shareButtons: [
    {id: 'download', label: 'Download image', url: '{{raw_image_url}}', download: true}
  ]
});
Vue.use(VueApollo);
Vue.use(ConfirmPlugin);

Object.defineProperty(Vue.prototype, '$axios', {value: axios});
Object.defineProperty(Vue.prototype, '$querystring', {value: querystring});

//重新封装toast, type可为success/warning/error, width请设为偶数，否则由于居中方式的问题可能将导致模糊
Vue.use(ShumsgToastPlugin);

Vue.directive('transfer-dom', TransferDom);
Vue.directive('pull-to-refresh', PullToRefreshDirective);

import FastClick from 'assets/js/fastclick'

// FastClick.attach(document.body);

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 5
});

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径
  uri: 'http://129.204.71.113/graphql'
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
new Vue({
  router,
  apolloProvider,
  render: h => h(App),
  // mounted() {
  //   告知prerender-spa-plugin可以移除骨架屏了
  // document.dispatchEvent(new Event('render-event'));
  // document.getElementById('prerender').remove();
  // }
}).$mount('#app-box');
