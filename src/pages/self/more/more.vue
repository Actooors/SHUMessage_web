<template>
  <ViewBox class="wrapper">
    <x-header slot="header" class="XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: true}"
              @on-click-more="handleClickMore">SHU Message
    </x-header>
    asd
  </ViewBox>
</template>

<script>
  import {ViewBox,XHeader} from 'vux'
  export default {
    name: "more",
    components:{
      ViewBox,
      XHeader
    },

  }
</script>

<style lang="scss" scoped>
@import "more";
</style>
