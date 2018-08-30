<template>
  <ViewBox ref="seoViewBox" id="__viewBox">
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:''}"
              :right-options="{showMore: false}"
              id="moments-XHeader"
    ><span class="title">{{$route.query.title}}</span>
      <div slot="right">
        <i class="icon-huida iconfont icon"></i>
      </div>
    </x-header>
    <iframe name="seo" :src="forward()" id="seo" ref="seo" class="seoFrame"></iframe>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'

  export default {
    name: "seo",
    components: {ViewBox, XHeader},
    data: () => ({
    }),
    mounted() {
      // let seo = document.getElementById("seo")
      let scrollBody = this.$refs.seoViewBox.getScrollBody()
      scrollBody.style.overflow = 'hidden';
      scrollBody.parentElement.style.overflow = 'hidden';
      scrollBody = null;
    },
    methods: {
      forward() {
        // return this.$route.query.url
        return 'http://localhost:8090/getforward/get?' + encodeURI(`url=${this.$route.query.url}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "seo";
</style>
