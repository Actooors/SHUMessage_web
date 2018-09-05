<template>
  <ViewBox
    id="__viewBox"
    body-padding-bottom="93px"
    ref="viewBox"
  >
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:'',preventGoBack:true}"
              @on-click-back="handleClickBack"
    >
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
          @onClickLike="handleClickLike(item)"
        ></comment-card>
      </div>
    </div>
    <reply-bar
      slot="bottom"
      :placeholder="replyPlaceholder"
      @onSubmit="handleSubmitReply"
    ></reply-bar>
    <share
      v-model="shareOptions.show"
      :url="shareOptions.url"
      :title="shareOptions.title"
      :digest="shareOptions.digest"
    ></share>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import CommentCard from 'components/commentCard/commentCard'
  import stickybits from 'stickybits'
  import store from 'store/store'
  import ReplyBar from 'components/replyBar/replyBar'
  import Share from 'components/share/share'

  export default {
    name: "msgDetail",
    store,
    components: {...{ViewBox, XHeader}, CommentCard, ReplyBar, Share},
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
      },
      shareOptions: {
        type: Object,
        default() {
          return {
            show: false,
            url: "",
            title: "",
            digest: ""
          }
        }
      }
    },
    data: () => ({}),
    watch: {
      msgLoaded(val) {
        let that = this
        if (val) {
          this.$nextTick(() => {
            stickybits('.justBar-box', {stickyBitStickyOffset: -1})
            that.judgeAndMoveToCommentBlocks()
          })
        }
      },
      '$route'(val, pre) {
        store.commit("pushRouter/SET_ROUTE_CHANGED", true)
      }
    },
    mounted() {
      let el = this.$refs.viewBox.getScrollBody()
      el.addEventListener('scroll', (event) => this.handleScroll(event, el))
      if (this.msgLoaded) {
        this.judgeAndMoveToCommentBlocks()
      }
    },
    methods: {
      handleClickBack() {
        if (store.state.pushRouter.routeChanged) {
          this.$router.go(-1)
          console.log("大概有进入detail的router-history")
        } else {
          this.$router.push('/')
          console.log("应该没有进入detail的router-history")
        }
      },
      judgeAndMoveToCommentBlocks(judge = true) {
        if (!judge
          || ('elComment' in this.$route.query && this.$route.query.elComment.toString() === "true")//query的特殊性
        ) {
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
      handleClickLike(msg) {
        this.$emit('onClickLike', 0, msg)
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
      },
      handleClickCard() {//该函数名不具有实际意义，仅供sharebarMixin统一调用
        this.judgeAndMoveToCommentBlocks(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
