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
            <div class="share-div">
              <ul class="row operation">
                <li class="row-li share-li" @click="sharetoqq">
                  <img src="../../assets/images/qq.png" class="shareIcon"/>
                  <p class="tag">QQ</p>
                </li>
                <li class="row-li share-li" @click="sharetowx">
                  <img src="../../assets/images/weixin.png" class="shareIcon"/>
                  <p class="tag">微信</p>
                </li>
                <li class="row-li share-li" @click="sharetopyq">
                  <img src="../../assets/images/pengyouquan.png" class="shareIcon"/>
                  <p class="tag">朋友圈</p>
                </li>
                <li class="row-li share-li" @click="sharetoweibo">
                  <img src="../../assets/images/weibo.png" class="shareIcon"/>
                  <p class="tag">微博</p>
                </li>
                <li class="row-li share-li" @click="sharetoqzone">
                  <img src="../../assets/images/qzone.png" class="shareIcon"/>
                  <p class="tag">QQ空间</p>
                </li>
              </ul>
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

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  import {Popup, Scroller} from 'vux'
  import ClipboardJS from 'clipboard'

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
//        console.log(this.$route.query.title)
        var shareqqstring = "http://connect.qq.com/widget/shareqq/index.html?url=" + this.url + "&title=" + encodeURIComponent(this.$route.query.title) + "&site=" + document.title;
        window.open(shareqqstring, "_blank")
      },
      sharetowx() {
//        var sharetowx =
      },
      sharetoqzone() {
        var sharetoqzone = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + this.url + "&title=" + this.$route.query.title + "&site=" + document.title + "&pics=";
        window.open(sharetoqzone, "_blank")
      },
      sharetoweibo() {
        var sharetoweibo = "http://service.weibo.com/share/mobile.php?url=" + this.url + "&title=" + this.$route.query.title + "&site=" + document.title;
        window.open(sharetoweibo, "_blank")
      },
      sharetopyq() { //微信朋友圈功能还没写
//        wx.onMenuShareTimeline({
//          title: this.$route.query.title,
//          link: this.url,
//          success: function () {
//            console.log("success");
//          },
//          cancel: function () {
//            console.log("cancel")
//          }
//        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "share";
</style>
