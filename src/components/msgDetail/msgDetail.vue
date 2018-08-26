<template>
  <ViewBox>
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:''}">
      {{headerTitle}}
    </x-header>
    <slot></slot>
    <div class="justBar">热门评论</div>

  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'

  export default {
    name: "msgDetail",
    components: {ViewBox, XHeader},
    props: {
      headerTitle: {
        type: String,
        default: '详情页'
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
