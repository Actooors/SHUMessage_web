<template>
  <div v-transfer-dom>
    <popup v-model="showPopup" is-transparent>
      <div class="popup">
        <div class="content">
          <p class="title">
            分享到
          </p>
          <scroller lock-y :scrollbar-x=false ref="scroller">
            <div class="nowrapspace">
              <div class="share-div">
              </div>
            </div>
          </scroller>
          <div class="hr"></div>
          <scroller lock-y
                    :scrollbar-x=false
                    v-if="showMoreOperations">
            <div class="nowrapspace">
              <ul class="row operation">
                <li
                  class="row-li"
                  @click="$emit('onRefresh')"
                >
                  <i class="icon-sync iconfont icon"></i>
                  <p class="tag">刷新页面</p>
                </li>
                <li
                  class="row-li copy-link"
                  v-if="url"
                  @click="handleCopyURL"
                  :data-clipboard-text="url"
                >
                  <i class="icon-link iconfont icon"></i>
                  <p class="tag">复制链接</p>
                </li>
                <li class="row-li" v-if="url" @click="handleOpenBlank">
                  <i class="icon-compass iconfont icon"></i>
                  <p class="tag">浏览器</p>
                </li>
              </ul>
            </div>
          </scroller>
        </div>
        <div class="cancel" @click="showPopup=false">取消</div>
      </div>
    </popup>
  </div>
</template>

<script>
  import {Popup, Scroller} from 'vux'
  import ClipboardJS from 'clipboard'
  import soshm from 'components/soshm/src/js'

  export default {
    name: "share",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      showMoreOperations: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        require: true
      },
      title: {
        type: String,
        default: ''
      },
      pic: {
        type: String,
        default() {
          return `https://ws1.sinaimg.cn/large/006P5HMAgy1fv5vcvzj5aj3040040742.jpg`
        }
      },
      digest: {
        type: String,
        require: true
      }
    },
    components: {Popup, Scroller},
    data: () => ({
      showPopup: false
    }),
    watch: {
      showPopup(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.showPopup = val
        let that = this
        if (val) {
          soshm('.share-div', {
            // 分享的链接，默认使用location.href
            url: that.url,
            // 分享的标题，默认使用document.title
            title: that.title,
            // 分享的摘要，默认使用<meta name="description" content="">content的值
            digest: that.digest,
            // 分享的图片，默认获取本页面第一个img元素的src
            pic: that.pic,
            // 默认显示的网站为以下六个个,支持设置的网站有
            // weixin,weixintimeline,qq,qzone,yixin,weibo,tqq,renren,douban,tieba
            sites: ['weibo', 'qq', 'qzone']
          });
        }
      }
    },
    mounted() {
      let clipboard = new ClipboardJS('.copy-link');
      clipboard.on('success', (e) => {
        this.$vux.toast.text('复制链接成功!', 'default');
        e.clearSelection();
      });
      clipboard.on('error', (e) => {
        this.$vux.toast.text('复制链接失败!', 'default');
      });
      let that = this
    },
    methods: {
      handleCopyURL() {
        this.showPopup = false
      },
      handleOpenBlank() {
        window.open(this.url, "_blank")
        this.showPopup = false
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "share";
</style>
