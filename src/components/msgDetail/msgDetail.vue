<template>
  <ViewBox
    id="__viewBox"
    body-padding-bottom="93px"
    ref="viewBox"
  >
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
      <div class="justBar-box"><p class="justBar"><span class="justBar-title">{{block.blockName}}</span></p></div>
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
        @onClickLike="handleClickLike(item.info)"
      ></comment-card>
    </div>
    <reply-bar
      slot="bottom"
      :placeholder="replyPlaceholder"
      @onSubmit="handleSubmitReply"
    ></reply-bar>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import CommentCard from 'components/commentCard/commentCard'
  import stickybits from 'stickybits'
  import store from 'store/store'
  import ReplyBar from 'components/replyBar/replyBar'

  export default {
    name: "msgDetail",
    store,
    components: {...{ViewBox, XHeader}, CommentCard, ReplyBar},
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
      },
      replyPlaceholder: {
        type: String,
        default: ''
      },
      noMore: {
        type: Boolean,
        default: false
      },
      loadingMore: {
        type: Boolean,
        default: false
      },
      msgLoaded: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({}),
    watch: {
      msgLoaded(val) {
        if (val) {
          this.$nextTick(() => {
            stickybits('.justBar-box', {stickyBitStickyOffset: -1})
          })
        }
      }
    },
    mounted() {
      let el = this.$refs.viewBox.getScrollBody()
      el.addEventListener('scroll', (event) => this.handleScroll(event, el))
    },
    methods: {
      handleClickReply(item) {
        store.commit("pushRouter/SET_CARD_ITEM", item)
        this.$router.push({
          path: '/commentDetail',
          query: item.info
        })
      },
      handleClickLike(info) {
        this.$emit('onClickLike', info)
      },
      handleSubmitReply() {
        this.$emit('onSubmitReply')
      },
      handleScroll(event, el) {
        if (!this.noMore
          && !this.loadingMore
          && el.scrollHeight - el.scrollTop - el.offsetHeight < 800//摸底不到800
        ) {
          console.log("!")
          this.$emit('loadMore')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
