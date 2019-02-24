import {requestLike} from './shareButtonAjax'
import Vue from 'vue'
import Share from 'components/share/share'
import store from 'store/store'
import {mapState} from 'vuex'

const bComponent = Vue.extend({
  props: ['text'],
  template: '<li>B Component: {{ text }}</li>'
})
export default {
  store,
  mounted() {
    console.log(this._getShareVN(), 'sharebarMixin: mounted');
  },
  methods: {
    /*
    * 如果msgs是一个数组，其info信息必须相同。则对数组每个元素都执行前端渲染（如点赞+1），但只对msgs[0]的info执行xhr请求
    * 如果msgs不是一个数组，则先将其变为单元素数组
    * */
    _getShareVN() {
      const that = this;
      //建一个Share组件
      let vn = null;
      let existShare = this.$root.$children.some((x) => {
        if (x.$options.name === "__sharebarMixin") {
          vn = x.$children[0];
          return true
        }
        return false
      });
      if (!existShare) {
        let el = document.createElement("div");
        this.$root.$el.appendChild(el);
        store.commit('sharebar/SET_SHARE_OPTIONS', {
          url: ``,
          title: '',
          digest: ``,
          show: false
        });
        el = new Vue({
          components: {Share},
          render: h => h('Share', {
            props: {
              value: store.state.sharebar.shareOptions.show,
              url: store.state.sharebar.shareOptions.url,
              title: store.state.sharebar.shareOptions.title,
              digest: store.state.sharebar.shareOptions.digest,
            },
            on: {
              input: function (val) {
                store.commit('sharebar/SET_SHARE_OPTIONS_SHOW',val)
              }
            }
          }),
          name: "__sharebarMixin"
        }).$mount(el);
        this.$root.$children.push(el);
        vn = el.$children[0];
      }
      return vn;
    },
    handleClickShareButton(btnIndex, msgs) {
      //如果msg为单个msg，则转为单元素数组
      if (!('length' in msgs)) {
        msgs = [msgs]
      }
      console.log("sharebarMixin - btnIndex", btnIndex);
      switch (btnIndex) {
        case 0:
          //0是点赞
          requestLike(msgs[0].info, !msgs[0].footprint.like);
          for (let x of msgs) {
            if (x.footprint.like) {
              --x.shareInfo.like
            } else {
              ++x.shareInfo.like
            }
            x.footprint.like = !x.footprint.like
          }
          break;
        case 1:
          //1是评论
          if ("handleClickCard" in this) {
            this.handleClickCard(null, msgs[0].info)
          } else if ("maincard" in this.$refs && "handleClickCard" in this.$refs.maincard) {
            this.$refs.maincard.handleClickCard(null, msgs[0].info)
          }
          break;
        case 2:
          //2是转发
          break;
        case 3:
          //3是分享
          store.commit('sharebar/SET_SHARE_OPTIONS', {
            url: `${window.location.protocol}//${window.location.host}/detail/msg?type=${msgs[0].info.type}&id=${msgs[0].info.id}`,
            title: 'SHU Message',
            digest: `${msgs[0].author.name}: ${msgs[0].content}`,
            show: true
          });
          break;
      }
    }
  }
}
