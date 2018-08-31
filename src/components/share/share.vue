<template>
  <div v-transfer-dom>
    <popup v-model="showPopup" is-transparent>
      <div class="popup">
        <div class="content">
          <p class="title">
            分享到
          </p>
          <div class="row share">
            <scroller lock-y :scrollbar-x=false>
              <div class="share-div">
                <ul class="row operation">
                  <li class="row-li share-li">
                    <img src="src/assets/images/qq.png" class="shareIcon"/>
                    <p class="tag">QQ</p>
                  </li>
                  <li class="row-li share-li">
                    <img src="src/assets/images/weixin.png" class="shareIcon"/>
                    <p class="tag">微信</p>
                  </li>
                  <li class="row-li share-li">
                    <img src="src/assets/images/pengyouquan.png" class="shareIcon"/>
                    <p class="tag">朋友圈</p>
                  </li>
                  <li class="row-li share-li">
                    <img src="src/assets/images/weibo.png" class="shareIcon"/>
                    <p class="tag">微博</p>
                  </li>
                  <li class="row-li share-li">
                    <img src="src/assets/images/qzone.png" class="shareIcon"/>
                    <p class="tag">QQ空间</p>
                  </li>
                </ul>
              </div>
            </scroller>
          </div>
          <div class="hr"></div>
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
        <div class="cancel" @click="showPopup=false">取消</div>
      </div>
    </popup>
  </div>
</template>

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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "share";
</style>
