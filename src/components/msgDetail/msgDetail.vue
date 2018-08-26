<template>
  <ViewBox>
    <x-header slot="header" class="XHeader force-black"
              :left-options="{backText:''}">
      {{headerTitle}}
    </x-header>
    <slot></slot>
    <div class="justBar">热门评论</div>

  </ViewBox>
</template>

<script>
  import {ViewBox} from 'vux'

  export default {
    name: "msgDetail",
    components: {ViewBox},
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
