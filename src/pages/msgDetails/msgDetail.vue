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
    <div class="mainMsg">
      <common-card
        v-if=" 'type' in $route.query && $route.query.type.toString()==='0'"
        :msg="msg"
        :lazyload=false

        @onClickShareButton="handleClickShareButton(...arguments,msg)"
      ></common-card>
      <user-message-card
        class="userMsgDetail-card"
        v-if=" 'type' in $route.query && $route.query.type.toString()==='1'"
        :lazyload=false

        :msg="msg"
        @onClickShareButton="handleClickShareButton(...arguments,msg)"
      ></user-message-card>
      <comment-card
        v-if=" 'type' in $route.query && $route.query.type.toString()==='2'"
        :lazyload=false

        :content="msg.content"
        :author="msg.author"
        :publishTime="msg.publishTime"
        :shareInfo="msg.shareInfo"
        :replies="msg.replies"
        :info="msg.info"
        :footprint="msg.footprint"
        :imgs="msg.imgs"
        :showComment=false
        @onClickLike="handleClickShareButton(0,msg)"
        @onClickImg="handleClickCommentImg"
      ></comment-card>
    </div>
    <div class="comment-blocks" id="comment-blocks">
      <div class="comment-loading" v-if="!raw.length && !allLoaded">
        <Spinner type="lines"></Spinner>
      </div>
      <LoadMore :show-loading=false tip="暂无评论，快来抢沙发吧！" v-if="!raw.length && allLoaded"></LoadMore>
      <div
        v-for="(block,blockIndex) of raw"
        :key="block.value"
        class="block"
      >
        <div class="justBar-box"><p class="justBar"><span class="justBar-title">{{block.blockName}}</span></p></div>
        <comment-card
          v-for="(item,index) of block.cards"
          :key="item.value"
          :class="{'popping':showPop[0]===blockIndex && showPop[1]===index}"
          :tick="tick"

          :content="item.content"
          :author="item.author"
          :publishTime="item.publishTime"
          :shareInfo="item.shareInfo"
          :replies="item.replies"
          :info="item.info"
          :footprint="item.footprint"
          :imgs="item.imgs"
          :show-comment="showComment"
          @onClickReply="handleClickReply(item)"
          @onClickLike="handleShare(0,item)"
          @onClickCard="handleClickCommentCard(...arguments,[blockIndex,index],item)"
          @onClickImg="handleClickCommentImg"
        ></comment-card>
      </div>

      <div class="comment-loading" v-if="loadingMoreComments">
        <Spinner type="lines"></Spinner>
      </div>
      <LoadMore :show-loading=false tip="没有更多了" v-if="noMore"></LoadMore>

    </div>
    <reply-bar
      slot="bottom"
      :placeholder="`回复${replyName}:`"
      @onSubmit="handleComment(...arguments, replyInfo)"
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
        <li class="popover-btn" @click="handleClickPopBtn(2)" v-show="showPopDeleteBtn">
          <i class="icon-fuzhi iconfont icon"></i>
          <span class="icon-label">删除</span>
        </li>
      </ul>
    </Popover>
    <div v-transfer-dom>
      <previewer :list="previewerList" ref="previewer" :options="previewerOptions"></previewer>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Previewer, Spinner, LoadMore} from 'vux'
  import {querystring} from 'vux'
  import CommonCard from 'components/commonCard/commonCard'
  import UserMessageCard from "components/userMessageCard/userMessageCard";
  import CommentCard from 'components/commentCard/commentCard'
  import stickybits from 'stickybits'
  import store from 'store/store'
  import ReplyBar from 'components/replyBar/replyBar'
  import Share from 'components/share/share'
  import Popover from 'components/popover/popover'
  import ClipboardJS from 'clipboard'
  import sharebarMixin from "assets/js/sharebarMixin";
  import ajaxMixin from "pages/msgDetails/ajaxMixin";
  import {getUserInfoFromToken} from 'assets/js/tokenTools'

  export default {
    name: "msgDetail",
    store,
    components: {
      ...{ViewBox, XHeader, Previewer, Spinner, LoadMore},
      CommonCard,
      UserMessageCard,
      CommentCard,
      ReplyBar,
      Share,
      Popover
    },
    data: () => ({
      timer: null,
      tick: 0,
      showPop: [-1, -1],
      showPopDeleteBtn: false,
      popX: 0,
      popY: 0,
      popGutter: 0,
      copyContent: "",
      highlightItem: null,
      previewerList: [],
      previewerTarget: null,
      previewerOptions: {},
      headerTitle: '详情',
      showComment: true,
      replyName: "",
      replyInfo: {}
    }),
    computed: {
      showPopBoolean() {
        return this.showPop[0] >= 0 && this.showPop[1] >= 0
      },
      query() {
        return querystring.parse(location.search)
      }
    },
    watch: {
      allLoaded(val) {
        let that = this
        if (val) {
          this.$nextTick(() => {
            stickybits('.justBar-box', {stickyBitStickyOffset: -1})
            this.initClipboard()
            that.judgeAndMoveToCommentBlocks()
          })
        }
        this.replyName = this.msg.author.name
        this.replyInfo = this.msg.info
      },
      '$route'(val, pre) {
        store.commit("pushRouter/SET_ROUTE_CHANGED", true)
        this.showPop = [-1, -1]
        this.initTitle()
      }
    },
    mounted() {
      let that = this
      this.previewerOptions = {
        getThumbBoundsFn: this.getThumbBoundsFn
      }
      let el = this.$refs.viewBox.getScrollBody()
      this.$refs.viewBox.$el.addEventListener('touchmove', () => this.showPop = [-1, -1])
      // this.$refs.viewBox.$el.addEventListener('touchstart', () => this.$refs.replyBar.$el.querySelector('#textarea').blur())
      this.$refs.viewBox.$el.addEventListener('click', () => this.showPop = [-1, -1])
      el.addEventListener('scroll', () => this.showPop = [-1, -1])
      el.addEventListener('scroll', (event) => this.handleScroll(event, el))

      if (this.allLoaded) {
        this.judgeAndMoveToCommentBlocks()
      }
      this.initTitle()
      this.timer = setInterval(() => {
        that.tick = Date.now()
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      handleShare(btnIndex, msg) {
        //对所有满足msg.info的数据进行
        let arr = []
        console.log("?", msg)
        this.raw.map((block) => {
          arr.push(...block.cards.filter(card => card.info.id === msg.info.id && card.info.type === msg.info.type))
        });
        console.log("!!!", arr)
        this.handleClickShareButton(btnIndex, arr)
      },
      initTitle() {
        if ('type' in this.$route.query) {
          this.showComment = true
          switch (this.$route.query.type.toString()) {
            case '0':
              this.headerTitle = '消息详情'
              break;
            case '1':
              this.headerTitle = '动态详情'
              break;
            case '2':
              this.headerTitle = '评论详情'
              this.showComment = false
              break;
          }
        }
      },
      //previewer需要的options函数，用于计算缩略图源位置，以显示点开时的动画效果
      getThumbBoundsFn(index) {
        let thumbnail = this.previewerTarget
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        let rect = thumbnail.getBoundingClientRect()
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      },
      handleClickCommentImg(target) {
        this.previewerList = [{
          msrc: target.src,
          src: target.src,
          w: target.innerHeight,
          h: target.innerWidth
        }]
        this.previewerTarget = target
        setTimeout(() => {
          this.$refs.previewer.show(0)
        }, 0)
      },
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
            this.replyName = this.highlightItem.author.name
            this.replyInfo = this.highlightItem.info
            // this.$refs.replyBar.$el.querySelector('#textarea').focus()
            break
          case 2:
            console.log("删除评论、回复")
            break
        }
        this.showPop = [-1, -1]
      },
      handleClickBack() {
        // this.$router.go(-1)
        if (store.state.pushRouter.routeChanged) {
          this.$router.go(-1)
          // console.log("大概有进入detail的router-history")
        } else {
          // console.log("应该没有进入detail的router-history", store.state.pushRouter.routeChanged, store.state.pushRouter.defaultHistoryLength, history.length)
          this.$router.push('/')
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
      handleScroll(event, el) {
        if (!this.noMore
          && !this.loadingMoreComments
          && el.scrollTop + el.offsetHeight >= el.scrollHeight * 0.8 //已经浏览完所显示的80%的评论了
        ) {
          this.loadMore()
        }

        //记录scrollTop
        this.$store.commit("pushRouter/SET_DETAIL_SCROLL_TOP", [this.query.type, this.$refs.viewBox.getScrollBody().scrollTop])
      },
      handleClickCard() {//该函数名不具有实际意义，仅供sharebarMixin统一调用
        this.judgeAndMoveToCommentBlocks(false)
      },
      judgeDeleteRight(commentItem) {
        let userinfo = getUserInfoFromToken()
        return (
          userinfo.id === commentItem.author.id//要么是自己
          || userinfo.id === this.msg.author.id//要么是msg的作者
        )
      },
      handleClickCommentCard(clickX, clickY, [blockIndex, cardIndex], item) {
        if (this.showPop[0] === blockIndex && this.showPop[1] === cardIndex) {
          this.showPop = [-1, -1]
          return
        }
        this.highlightItem = item
        this.showPopDeleteBtn = this.judgeDeleteRight(item)
        this.copyContent = item.content
        this.showPop = [blockIndex, cardIndex]
        let that = this
        this.$nextTick(() => {
          let elem = that.$refs.popover.$refs.popover
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
          that.popX = clickX - elemWidth / 2 - overWidth
          that.popY = clickY - elemHeight - 5
          that.popGutter = elemWidth / 2 - overWidth - 5
        })
      }
    },
    mixins: [sharebarMixin, ajaxMixin]
  }
</script>

<style lang="scss" scoped>
  @import 'msgDetail';
</style>
