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
    <div class="comment-blocks" id="comment-blocks">
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
          :shareInfo="item.shareInfo"
          :replies="item.replies"
          :info="item.info"
          :footprint="item.footprint"
          :show-comment="showComment"
          @onClickReply="handleClickReply(item)"
          @onClickLike="handleClickLike(item.info,item.footprint,item.shareInfo)"
        ></comment-card>
      </div>
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
        let that = this
        if (val) {
          this.$nextTick(() => {
            stickybits('.justBar-box', {stickyBitStickyOffset: -1})
            that.moveToCommentBlocks()
          })
        }
      }
    },
    mounted() {
      let el = this.$refs.viewBox.getScrollBody()
      el.addEventListener('scroll', (event) => this.handleScroll(event, el))
      if (this.msgLoaded) {
        this.moveToCommentBlocks()
      }
    },
    methods: {
      moveToCommentBlocks() {
        if (this.$route.query.elComment) {
          console.log("锚过来啊")
          let el = this.$refs.viewBox.getScrollBody()
          el.scrollTop = el.querySelector('#comment-blocks').offsetTop - 50;
        }
      },
      handleClickReply(item) {
        store.commit("pushRouter/SET_CARD_ITEM", item)
        this.$router.push({
          path: '/commentDetail',
          query: item.info
        })
      },
      handleClickLike(info, footprint, shareInfo) {
        this.$emit('onClickLike', 0, info, footprint, shareInfo)
      },
      handleSubmitReply(content, imgUrl) {
        this.$emit('onSubmitReply', content, imgUrl)
      },
      handleScroll(event, el) {
        if (!this.noMore
          && !this.loadingMore
          && el.scrollTop + el.offsetHeight >= el.scrollHeight * 0.8 //已经浏览完所显示的80%的评论了
        ) {
          // console.log("loadMore")
          this.$emit('loadMore')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
