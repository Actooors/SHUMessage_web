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
          v-for="(item,index) of block.cards"
          :key="item.value"
          :class="{'popping':showPop===index}"

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
          @onClickCard="handleClickCommentCard(...arguments,index,item)"
        ></comment-card>
      </div>
    </div>
    <reply-bar
      slot="bottom"
      :placeholder="replyPlaceholder"
      @onSubmit="handleSubmitReply"
      ref="replyBar"
    ></reply-bar>
    <share
      v-model="shareOptions.show"
      :url="shareOptions.url"
      :title="shareOptions.title"
      :digest="shareOptions.digest"
    ></share>
    <Popover
      :pos="{left:`${popX}px`,top:`${popY}px`}"
      v-model="showPopBoolean"
      placement="top"
      :gutter="popGutter"
      class="operating-popover"
      ref="popover"
    >
      <ul slot="content" class="popover">
        <li class="popover-btn" @click="handleClickPopBtn(0)">
          <i class="icon-bianjibiaoge iconfont icon"></i>
          <span class="icon-label">回复</span>
        </li>
        <li class="popover-btn copy-content" @click="handleClickPopBtn(1)" :data-clipboard-text="copyContent">
          <i class="icon-fuzhi iconfont icon"></i>
          <span class="icon-label">复制</span>
        </li>
      </ul>
    </Popover>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import CommentCard from 'components/commentCard/commentCard'
  import stickybits from 'stickybits'
  import store from 'store/store'
  import ReplyBar from 'components/replyBar/replyBar'
  import Share from 'components/share/share'
  import Popover from 'components/popover/popover'
  import ClipboardJS from 'clipboard'

  export default {
    name: "msgDetail",
    store,
    components: {...{ViewBox, XHeader}, CommentCard, ReplyBar, Share, Popover},
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
    data: () => ({
      showPop: -1,
      popX: 0,
      popY: 0,
      popGutter: 0,
      copyContent: "",
      highlightItem: null
    }),
    computed: {
      showPopBoolean() {
        return this.showPop >= 0
      }
    },
    watch: {
      msgLoaded(val) {
        let that = this
        if (val) {
          this.$nextTick(() => {
            stickybits('.justBar-box', {stickyBitStickyOffset: -1})
            this.initClipboard()
            that.judgeAndMoveToCommentBlocks()
          })
        }
      },
      '$route'(val, pre) {
        store.commit("pushRouter/SET_ROUTE_CHANGED", true)
        this.showPop = -1
      }
    },
    mounted() {
      let el = this.$refs.viewBox.getScrollBody()
      this.$refs.viewBox.$el.addEventListener('touchmove', () => this.showPop = -1)
      this.$refs.viewBox.$el.addEventListener('touchstart', () => this.$refs.replyBar.$el.querySelector('#textarea').blur())
      this.$refs.viewBox.$el.addEventListener('click', () => this.showPop = -1)
      el.addEventListener('scroll', () => this.showPop = -1)
      el.addEventListener('scroll', (event) => this.handleScroll(event, el))

      if (this.msgLoaded) {
        this.judgeAndMoveToCommentBlocks()
      }
    },
    methods: {
      initClipboard() {
        let clipboard = new ClipboardJS('.copy-content');
        clipboard.on('success', (e) => {
          this.$vux.toast.text('复制成功!', 'default');
          e.clearSelection();
        });
        clipboard.on('error', (e) => {
          this.$vux.toast.text('复制失败!', 'default');
        });
      },
      handleClickPopBtn(btnIndex) {
        switch (btnIndex) {
          case 0:
            this.$emit('onClickPopReply', this.highlightItem)
            this.$refs.replyBar.$el.querySelector('#textarea').focus()
            break
        }
        this.showPop = -1
      },
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
      },
      handleClickCommentCard(clickX, clickY, cardIndex, item) {
        if (this.showPop === cardIndex) {
          this.showPop = -1
          return
        }
        this.highlightItem = item
        this.copyContent = item.content
        this.showPop = cardIndex
        this.$nextTick(() => {
          let elem = this.$refs.popover.$refs.popover
          let [screenHeight, screenWidth, elemHeight, elemWidth] = [
            document.documentElement.offsetHeight,
            document.documentElement.offsetWidth,
            elem.offsetHeight,
            elem.offsetWidth
          ]
          let overWidth = 0
          if (clickX + elemWidth / 2 > screenWidth) {
            overWidth = clickX + elemWidth / 2 - screenWidth
          }
          if (clickX - elemWidth / 2 < 0) {
            overWidth = clickX - elemWidth / 2
          }
          this.popX = clickX - elemWidth / 2 - overWidth
          this.popY = clickY - elemHeight - 5
          this.popGutter = elemWidth / 2 - overWidth - 5
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './msgDetail';
</style>
