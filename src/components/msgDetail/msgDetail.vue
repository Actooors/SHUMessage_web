<template>
  <ViewBox id="__viewBox">
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:''}">
      {{headerTitle}}
    </x-header>
    <slot></slot>
    <div class="justBar">热门评论</div>
    <comment-card
      v-for="item of cards"
      :key="item.value"
      :content="item.content"
      :author="item.author"
      :publishTime="item.publishTime"
      :photos="item.photos"
      :like="item.like"
      :replies="item.replies"
      :info="item.info"
    ></comment-card>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import CommentCard from 'components/commentCard/commentCard'
  import mock from './mock'

  export default {
    name: "msgDetail",
    components: {...{ViewBox, XHeader}, CommentCard},
    props: {
      headerTitle: {
        type: String,
        default: '详情页'
      }
    },
    mixins: [mock]
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
