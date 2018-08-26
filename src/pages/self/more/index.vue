<template>
  <ViewBox class="wrapper">
    <x-header slot="header" class="XHeader force-black"
              :left-options="{backText:''}">
      {{$store.state.top.header_title}}
    </x-header>
    <router-view></router-view>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import store from 'store/store'

  export default {
    name: "index",
    store,
    components: {
      ViewBox,
      XHeader,
    },

  }
</script>

<style lang="scss" scoped>
  @import "index";
</style>
<style lang="scss">
  .force-black {
    .vux-header-title, .vux-header-back, .vux-header-left, .vux-header-right {
      color: black !important;
    }
  }
</style>
