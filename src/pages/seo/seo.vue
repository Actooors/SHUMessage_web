<template>
  <ViewBox ref="seoViewBox" id="__viewBox">
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:''}"
              id="seo-XHeader"
    >
      <i class="icon-more iconfont icon" slot="right" @click="handleClickMore"></i>
      <span class="title">{{$route.query.title}}</span>
    </x-header>
    <iframe name="seo" :src="forward()" id="seo" class="seoFrame" :key="refresh"></iframe>
    <share
      v-model="showPopup"
      @onRefresh="handleOnRefresh"
      :url="$route.query.url"
      showMoreOperations
    ></share>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import Share from 'components/share/share'


  export default {
    name: "seo",
    components: {...{ViewBox, XHeader}, Share},
    data: () => ({
      showPopup: false,
      refresh: true
    }),
    mounted() {
      //解决iframe的touch事件不能被捕获，从而导致橡皮筋现象的问题
      //解决iframe在iPhone的Safari显示不全的问题（iframe内页面的自适应问题很奇妙就解决了，我也不知道怎么搞的）
      //无法解决安卓QQ浏览器的橡皮筋
      let scrollBody = this.$refs.seoViewBox.getScrollBody()
      scrollBody.style.position = 'fixed';
      scrollBody.style.width = '100%';
    },
    methods: {
      forward() {
        // return this.$route.query.url
        return 'http://forward.api.mzz.pub:8090/getforward/get?' + encodeURI(`url=${this.$route.query.url}`)
        // return 'http://192.168.50.111:8090/getforward/get?' + encodeURI(`url=${this.$route.query.url}`)
      },
      handleClickMore() {
        this.showPopup = true
      },
      handleOnRefresh() {
        let seo = document.getElementById('seo')
        if ("outerHTML" in seo) {
          seo.outerHTML = seo.outerHTML
        } else {
          let iframe = document.createElement('iframe')
          iframe.id = "seo"
          iframe.name = "seo"
          iframe.className = "seoFrame"
          iframe.style.cssText = "width: 100%;height: 100%;border: none;"
          iframe.src = this.forward()
          let parent = seo.parentElement
          parent.removeChild(seo)
          parent.appendChild(iframe)
        }
        this.showPopup = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "seo";
</style>

