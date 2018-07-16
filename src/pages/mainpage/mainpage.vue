<template>
  <ViewBox>
    <!--<div :left-options="{showBack: showBack}" class="XHeader-box">-->
      <!--<x-header class="XHeader">SHU Message</x-header>-->
    <!--</div>-->
    <router-view></router-view>
    <tabbar slot="bottom">
      <tabbar-item link="/">
        <img slot="icon-active" src="../../assets/images/信息.png">
        <img slot="icon" src="../../assets/images/信息gray.png">
        <span slot="label">动态</span>
      </tabbar-item>
      <tabbar-item selected link="/">
        <img slot="icon-active" src="../../assets/images/灵感.png">
        <img slot="icon" src="../../assets/images/灵感gray.png">
        <span slot="label">新鲜事</span>
      </tabbar-item>
      <tabbar-item link="self">
        <img slot="icon-active" src="../../assets/images/用户.png">
        <img slot="icon" src="../../assets/images/用户gray.png">
        <span slot="label">自己</span>
      </tabbar-item>
    </tabbar>
  </ViewBox>
</template>

<script>
  import {Tabbar, TabbarItem, XHeader, ViewBox} from 'vux'

  export default {
    name: "mainpage",
    components: {
      Tabbar,
      TabbarItem,
      XHeader,
      ViewBox
    },
    data() {
      return {
        showBack: false
      }
    },
    watch: {
      "$route"(r) {
        this.showBack = r !== '/'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "mainpage";
</style>
