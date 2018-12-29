//可传入指令一个返回promise的函数
import PullToRefresh from 'pulltorefreshjs';
import Vue from 'vue';
import {Spinner, Icon} from 'vux'

const directive = {
  inserted(el, {value}, vnode) {
    //加个条件判断以兼容vux的view-box
    if (vnode.componentInstance.$options.name === "view-box") {
      el = vnode.componentInstance.getScrollBody();
    }

    el.__pullToRefresh = PullToRefresh.init({
      mainElement: el,
      triggerElement: el,
      distMax: '80',
      distThreshold: '70',
      distReload: '70',
      refreshTimeout: 0,
      classPrefix: 'pulltorefresh--',
      instructionsPullToRefresh: '嗷～ 被你发现了～',
      instructionsReleaseToRefresh: '呜呜呜T.T 放了我吧',
      instructionsRefreshing: '一闪一闪亮晶晶',
      async onRefresh(reset) {
        //调用下拉刷新
        if (typeof value === 'function') {
          el.__pullToRefresh_iconVue.loading = true;
          const promise = value();
          if (promise) {
            const minDelay = new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 500)
            });
            await Promise.all([promise, minDelay])
            Vue.$vux.toast.show({
              text: '刷新好啦~',
              width: '300px',
              type: 'text',
              position: 'top'
            });
          } else {
            Vue.$vux.toast.show({
              text: '刷新太快了哦~',
              width: '300px',
              type: 'text',
              position: 'top'
            });
          }
        } else {
          console.error('Directive v-pull-to-refresh needs a function as value.')
        }
        el.__pullToRefresh_iconVue.loading = false;
        reset();
      },
      onInit(handler) {
        el.__pullToRefresh_iconVue = new Vue({
          components: {Spinner, Icon},
          data() {
            return {
              loading: false
            }
          },
          render(h) {
            if (!this.loading) {
              return h('icon', {
                props: {
                  type: 'circle'
                },
                style: 'font-size:21px;position:relative;top:-2px;color:#aaa;font-weight:bold'
              })
            }
            return h('spinner', {
              props: {
                type: 'ripple'
              }
            })
          }
        }).$mount('.pulltorefresh--icon')
      }
    });
  },
  unbind(el) {
    el.__pullToRefresh && el.__pullToRefresh.destroy();
  }
};

export default directive;
