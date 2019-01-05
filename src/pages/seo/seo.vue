<template>
  <ViewBox ref="seoViewBox" bodyPaddingBottom="30px" class="needsscroll">
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:'',preventGoBack:true}"
              @on-click-back="handleClickBack"
              id="seo-XHeader"
    >
      <i class="icon-more iconfont icon" slot="right" @click="handleClickMore"></i>
      <span class="title">{{$route.query.title}}</span>
    </x-header>
    <iframe name="seo" :src="forward()" id="seo" class="seoFrame" v-once></iframe>
    <i class="logo"></i>
    <share
      v-model="showPopup"
      @onRefresh="handleOnRefresh"
      :url="$route.query.url"
      :title="$route.query.title"
      digest="分享自SHU Message"
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
    }),
    methods: {
      handleClickBack() {
        this.$router.go(-1);
      },
      forward() {
        // return this.$route.query.url
        let screenWidth = window.innerWidth || document.documentElement.clientWidth
        // return `http://192.168.50.111:8090/getforward/get?__url=${this.$route.query.url}&limit=${screenWidth - 50}`
        return `https://proxy.shumsg.cn/getforward/get?__url=${this.$route.query.url}&limit=${screenWidth - 50}`
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

