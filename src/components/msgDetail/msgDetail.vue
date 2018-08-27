<template>
  <ViewBox id="__viewBox">
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:''}">
      {{headerTitle}}
    </x-header>
    <slot></slot>
    <div
      v-for="block of raw"
      :key="block.value"
      class="block"
    >
      <div class="justBar-box"><p class="justBar">{{block.blockName}}</p></div>
      <comment-card
        v-for="item of block.cards"
        :key="item.value"
        :content="item.content"
        :author="item.author"
        :publishTime="item.publishTime"
        :photos="item.photos"
        :like="item.like"
        :replies="item.replies"
        :info="item.info"
        :show-comment="showComment"
        @onClickReply="handleClickReply(item)"
      ></comment-card>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import CommentCard from 'components/commentCard/commentCard'
  import stickybits from 'stickybits'
  import store from 'store/store'

  export default {
    name: "msgDetail",
    store,
    components: {...{ViewBox, XHeader}, CommentCard},
    props: {
      headerTitle: {
        type: String,
        default: '详情页'
      },
      showComment: {
        type: Boolean,
        default: true
      },
      raw: {
        type: Array,
        require: true
      }
    },
    mounted() {
      stickybits('.justBar-box', {stickyBitStickyOffset: -1})
    },
    methods: {
      handleClickReply(item) {
        store.commit("pushRouter/SET_CARD_ITEM", item)
        this.$router.push({
          path: '/commentDetail',
          query: item.info
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
