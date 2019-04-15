// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store/store'
import App from './App'
import {TransferDom, querystring, ConfirmPlugin} from 'vux'
import 'normalize.css'
import 'assets/js/noScale'
import VueLazyload from 'vue-lazyload'
import 'interceptors/interceptor'
import axios from 'axios'
import PullToRefreshDirective from 'assets/js/pullToRefreshDirective'
import 'assets/js/iNoBounce'
import ShumsgToastPlugin from 'assets/js/shumsgToastPlugin'
// import ApolloClient from 'apollo-boost'
// import VueApollo from 'vue-apollo'
import preview from 'vue-photo-preview-ex'
import 'vue-photo-preview-ex/dist/skin.css'
import {getUserInfoFromToken} from 'assets/js/tokenTools'
import TouchAction from 'touch-action'

TouchAction({src: 'assets/js/fastclick/js'});


Vue.use(preview, {
  shareEl: true,
  zoomEl: false,
  tapToToggleControls: false,
  tapToClose: true,
  loop: false,
  arrowEl: false,
  preload: [0, 2],
  shareButtons: [
    {id: 'download', label: 'Download image', url: '{{raw_image_url}}', download: true}
  ]
});
// Vue.use(VueApollo);
Vue.use(ConfirmPlugin);

Object.defineProperty(Vue.prototype, '$axios', {value: axios});
Object.defineProperty(Vue.prototype, '$querystring', {value: querystring});
Object.defineProperty(Vue.prototype, '$userInfo', {value: getUserInfoFromToken});

//重新封装toast, type可为success/warning/error, width请设为偶数，否则由于居中方式的问题可能将导致模糊
Vue.use(ShumsgToastPlugin);

Vue.directive('transfer-dom', TransferDom);
Vue.directive('pull-to-refresh', PullToRefreshDirective);

// FastClick.attach(document.body);

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 5
});

Vue.config.productionTip = false;

import VueAMap from 'vue-amap';

Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '9511251ad77487adcf5c4a7f9cdaea2a',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', "AMap.Geocoder"],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.14',
  uiVersion: '1.0.11'
});
new Vue({
  router,
  store,
  // apolloProvider,
  render: h => h(App),
  // mounted() {
  //   告知prerender-spa-plugin可以移除骨架屏了
  // document.dispatchEvent(new Event('render-event'));
  // document.getElementById('prerender').remove();
  // }
}).$mount('#app-box');
