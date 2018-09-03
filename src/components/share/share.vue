<template>
  <div v-transfer-dom>
    <popup v-model="showPopup" is-transparent>
      <div class="popup">
        <div class="content">
          <p class="title">
            分享到
          </p>
          <!--<div class="row share">-->
          <scroller lock-y :scrollbar-x=false ref="scroller">
            <div>
              <div class="share-div">
                <!--<ul class="row operation">-->
                <!--<li class="row-li share-li" @click="sharetoqq">-->
                <!--<img src="src/assets/images/qq.png" class="shareIcon"/>-->
                <!--<p class="tag">QQ</p>-->
                <!--</li>-->
                <!--<li class="row-li share-li" @click="sharetowx">-->
                <!--<img src="src/assets/images/weixin.png" class="shareIcon"/>-->
                <!--<p class="tag">微信</p>-->
                <!--</li>-->
                <!--<li class="row-li share-li" @click="sharetopyq">-->
                <!--<img src="src/assets/images/pengyouquan.png" class="shareIcon"/>-->
                <!--<p class="tag">朋友圈</p>-->
                <!--</li>-->
                <!--<li class="row-li share-li" @click="sharetoweibo">-->
                <!--<img src="src/assets/images/weibo.png" class="shareIcon"/>-->
                <!--<p class="tag">微博</p>-->
                <!--</li>-->
                <!--<li class="row-li share-li" @click="sharetoqzone">-->
                <!--<img src="src/assets/images/qzone.png" class="shareIcon"/>-->
                <!--<p class="tag">QQ空间</p>-->
                <!--</li>-->
                <!--</ul>-->
              </div>
            </div>
          </scroller>
          <!--</div>-->
          <div class="hr"></div>
          <scroller lock-y :scrollbar-x=false>
            <div>
              <ul class="row operation">
                <li
                  v-if="showRefresh"
                  class="row-li"
                  @click="$emit('onRefresh')"
                >
                  <i class="icon-sync iconfont icon"></i>
                  <p class="tag">刷新页面</p>
                </li><li
                  class="row-li copy-link"
                  v-if="url"
                  @click="handleCopyURL"
                  :data-clipboard-text="url"
                >
                  <i class="icon-link iconfont icon"></i>
                  <p class="tag">复制链接</p>
                </li><li class="row-li" v-if="url" @click="handleOpenBlank">
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

<!--<script src="src/components/soshm/dist/soshm.min.js"></script>-->
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
      showRefresh: {
        type: Boolean,
        default: false
      },
      url: {
        type: String
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
      soshm('.share-div', {
        // 分享的链接，默认使用location.href
        url: '',
        // 分享的标题，默认使用document.title
        title: '',
        // 分享的摘要，默认使用<meta name="description" content="">content的值
        digest: '',
        // 分享的图片，默认获取本页面第一个img元素的src
        pic: '',
        // 默认显示的网站为以下六个个,支持设置的网站有
        // weixin,weixintimeline,qq,qzone,yixin,weibo,tqq,renren,douban,tieba
        sites: ['weibo', 'qq', 'qzone']
      });
    },
    methods: {
      handleCopyURL() {
        this.showPopup = false
      },
      handleOpenBlank() {
        window.open(this.url, "_blank")
        this.showPopup = false
      },
      sharetoqq() {
        var shareqqstring = "http://connect.qq.com/widget/shareqq/index.html?url=" + this.url + "&title=" + encodeURIComponent(this.$route.query.title) + "&site=" + document.title;
        window.open(shareqqstring, "_blank")
      },
      sharetoqzone() {
        var sharetoqzone = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + this.url + "&title=" + this.$route.query.title + "&site=" + document.title + "&pics=";
        window.open(sharetoqzone, "_blank")
      },
      sharetoweibo() {
        var sharetoweibo = "http://service.weibo.com/share/mobile.php?url=" + this.url + "&title=" + this.$route.query.title + "&site=" + document.title;
        window.open(sharetoweibo, "_blank")
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "share";
</style>
