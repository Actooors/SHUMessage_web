<template>
  <scroll
    :noMore="!!discusses.length && !discussesConnection.pageInfo.hasNextPage"
    :pulldownCallback="()=>loadData(true)"
    :pullupCallback="()=>loadData(false)"
    :showLoadIcon="!discusses.length && $apollo.queries.discusses.loading"
    ref="viewBox"
    body-padding-bottom="94px"
  >
    <x-header slot="header" class="theme-XHeader"
              :left-options="{backText:'',preventGoBack:true}"
              @on-click-back="handleClickBack"
    >
      {{headerTitle}}
    </x-header>
    <div
      class="viewBox-body"
    >
      <div class="mainMsg" v-if="!$apollo.queries.news.loading">
        <common-card
          v-if=" 'type' in $route.query && $route.query.type==='News'"
          :msg="news"
          :lazyload=false

          @onClickShareButton="handleClickShareButton(...arguments,news)"
        ></common-card>
        <user-message-card
          class="userMsgDetail-card"
          v-if=" 'type' in $route.query && $route.query.type==='Dynamic'"
          :lazyload=false

          :msg="news"
          @onClickShareButton="handleClickShareButton(...arguments,news)"
        ></user-message-card>
        <comment-card
          v-if=" 'type' in $route.query && $route.query.type==='Discuss'"
          :lazyload=false
          :msg="item"
          :tick="tick"
          :showComment=false
          @onClickLike="handleClickShareButton(0,news)"
        ></comment-card>
      </div>
      <div class="comment-blocks" id="comment-blocks">
        <div class="more-loading" v-if="discusses.length && $apollo.queries.discusses.loading">
          <Spinner type="lines"></Spinner>
        </div>
        <LoadMore :show-loading=false tip="暂无评论，快来抢沙发吧！"
                  v-if="!discusses.length && !$apollo.queries.discusses.loading"></LoadMore>
        <Block
          :cards="hotDiscusses"
          name="热门评论"
          :block-index=0
          :showPop="showPop"
          v-if="hotDiscusses.length"
          @clickCommentCard="handleClickCommentCard"
        ></Block>
        <Block
          :cards="discusses"
          name="最新评论"
          :block-index=1
          :showPop="showPop"
          v-if="discusses.length"
          @clickCommentCard="handleClickCommentCard"
        ></Block>
      </div>
    </div>
    <reply-bar
      slot="bottom"
      :placeholder="`回复${replyName}:`"
      @onSubmit="handleComment"
      ref="replyBar"
    ></reply-bar>
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
    <!--<div v-transfer-dom>-->
    <!--<previewer :list="previewerList" ref="previewer" :options="previewerOptions"></previewer>-->
    <!--</div>-->
  </scroll>
</template>

<script>
  import gql from 'graphql-tag'
  import {XHeader, Spinner, LoadMore} from 'vux'
  import {querystring} from 'vux'
  import {isRouteEnter} from 'assets/js/routeTools';
  import CommonCard from 'components/commonCard/commonCard'
  import UserMessageCard from "components/userMessageCard/userMessageCard"
  import CommentCard from "components/commentCard/commentCard"

  import Scroll from 'components/scroll/scroll'
  import stickybits from 'stickybits'
  import store from 'store/store'
  import ReplyBar from 'components/replyBar/replyBar'
  import Popover from 'components/popover/popover'
  import ClipboardJS from 'clipboard'
  import sharebarMixin from "assets/js/sharebarMixin/index";
  // import ajaxMixin from "pages/msgDetails/ajaxMixin";
  import {getUserInfoFromToken} from 'assets/js/tokenTools'
  import Block from './block'

  import DISCUSSES from '../../graphql/discusses.gql'
  import NEWS from '../../graphql/news.gql'
  import DISCUSSES_CONNECTION from '../../graphql/discussesConnection.gql'
  import HOT_DISCUSSES from '../../graphql/hotDiscusses.gql'
  import CREATE_DISCUSS from '../../graphql/createDiscuss.gql'

  export default {
    name: "msgDetail",
    store,
    components: {
      ...{XHeader, Spinner, LoadMore},
      CommonCard,
      UserMessageCard,
      CommentCard,
      ReplyBar,
      Popover,
      Scroll,
      Block
    },
    data: () => ({
      timer: null,
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
      replyInfo: {},
      scrollBody: null,
      news: {},
      discusses: [],
      discussesConnection: {pageInfo: {hasNextPage: true, endCursor: null}},
      hotDiscusses: []
    }),
    apollo: {
      news: {
        query: NEWS,
        variables() {
          return {
            id: this.query().id
          }
        }
      },
      discusses: {
        query: DISCUSSES,
        variables() {
          return {
            after: null,
            target_message_id: this.query().id
          }
        }
      },
      discussesConnection: {
        query: DISCUSSES_CONNECTION,
        variables() {
          return {
            after: null,
            target_message_id: this.query().id
          }
        }
      },
      hotDiscusses: {
        query: HOT_DISCUSSES,
        variables() {
          return {
            target_message_id: this.query().id
          }
        }
      }
    },
    computed: {
      showPopBoolean() {
        return this.showPop[0] >= 0 && this.showPop[1] >= 0
      }
    },
    watch: {
      '$apollo.loading'(val) {
        if (val || this.firstLoaded) {
          return;
        }
        this.firstLoaded = true;
        let that = this;
        this.$nextTick(() => {
          stickybits('.justBar-box', {stickyBitStickyOffset: -1});
          this.initClipboard();
          that.judgeAndMoveToCommentBlocks()
        });
        this.replyName = this.news.publisher.nickname;
        this.replyInfo = {
          id: this.news.id,
          type: this.news.type
        }
      },
      '$route'(to, from) {
        const that = this;
        const isEnter = isRouteEnter(this, to);
        if (isEnter) {
          this.showPop = [-1, -1];
          this.initTitle();
          that.loadData();
        }
      }
    },
    mounted() {
      const el = this.$refs.viewBox.getScrollBody();
      this.scrollBody = el;
      this.$refs.viewBox.$el.addEventListener('touchmove', () => this.showPop = [-1, -1]);
      // this.$refs.viewBox.$el.addEventListener('touchstart', () => this.$refs.replyBar.$el.querySelector('#textarea').blur())
      this.$refs.viewBox.$el.addEventListener('click', () => this.showPop = [-1, -1]);
      el.addEventListener('scroll', () => this.showPop = [-1, -1]);
      // el.addEventListener('scroll', (event) => this.handleScroll(event, el))

      if (this.firstLoaded) {
        this.judgeAndMoveToCommentBlocks()
      }
      this.initTitle();
    },
    beforeDestroy() {
      const el = this.$refs.viewBox.getScrollBody();
      el.removeEventListener('scroll', () => this.showPop = [-1, -1])
    },
    methods: {
      query() {
        return querystring.parse(location.search);
      },
      handleComment(content, img_url) {
        const that = this;
        //创建一个discuss
        this.$apollo.mutate({
            mutation: CREATE_DISCUSS,
            variables: {
              target_type: this.replyInfo.type.toUpperCase(),
              target_message_id: this.replyInfo.id,
              content,
              img_url
            },
            refetchQueries: [{
              query: DISCUSSES,
              variables: {
                after: null,
                target_message_id: this.query().id
              }
            }, {
              query: DISCUSSES_CONNECTION,
              variables: {
                after: null,
                target_message_id: this.query().id
              }
            }]
          }
        )
      },
      async loadData(newRound = true) {
        console.log("msgDetail - loadData");
        let query = this.query();
        if (!this.discussesConnection.pageInfo.hasNextPage && !newRound) {
          return
        }
        let pNews = null,
          pHotDiscusses = null;
        if (newRound) {
          pNews = this.$apollo.queries.news.fetchMore({
            variables: {id: query.id},
            updateQuery(previousResult, {fetchMoreResult}) {
              return fetchMoreResult;
            }
          });
          pHotDiscusses = this.$apollo.queries.hotDiscusses.fetchMore({
            variables: {target_message_id: query.id},
            updateQuery(previousResult, {fetchMoreResult}) {
              return fetchMoreResult;
            }
          });
        }
        let pDiscusses = this.$apollo.queries.discusses.fetchMore({
          variables: {
            after: newRound ? null : this.discussesConnection.pageInfo.endCursor,
            target_message_id: query.id
          },
          updateQuery(previousResult, {fetchMoreResult}) {
            if (newRound) {
              return fetchMoreResult;
            }
            return {
              discusses: [...previousResult.discusses, ...fetchMoreResult.discusses]
            };
          }
        });
        let pDiscussesConnection = this.$apollo.queries.discussesConnection.fetchMore({
          variables: {
            after: newRound ? null : this.discussesConnection.pageInfo.endCursor,
            target_message_id: query.id
          },
          updateQuery(previousResult, {fetchMoreResult}) {
            return fetchMoreResult;
          }
        });
        return Promise.all([pNews, pHotDiscusses, pDiscusses, pDiscussesConnection])
      }
      ,
      handleShare(btnIndex, msg) {
        //对所有满足msg.info的数据进行
        let arr = [];
        console.log("?", msg);
        this.raw.map((block) => {
          arr.push(...block.cards.filter(card => card.info.id === msg.info.id && card.info.type === msg.info.type))
        });
        console.log("!!!", arr);
        this.handleClickShareButton(btnIndex, arr)
      }
      ,
      initTitle() {
        let query = this.query();
        if ('type' in query) {
          this.showComment = true;
          switch (query.type) {
            case 'News':
              this.headerTitle = '新闻详情';
              break;
            case 'Dynamic':
              this.headerTitle = '动态详情';
              break;
            case 'Discuss':
              this.headerTitle = '评论详情';
              this.showComment = false;
              break;
          }
        }
      }
      ,
      initClipboard() {
        let clipboard = new ClipboardJS('.copy-content');
        clipboard.on('success', (e) => {
          this.$toast({text: '复制成功!'});
          e.clearSelection();
        });
        clipboard.on('error', (e) => {
          this.$toast({text: '复制失败!', type: 'warning'});
        });
      }
      ,
      handleClickPopBtn(btnIndex) {
        switch (btnIndex) {
          case 0:
            this.replyName = this.highlightItem.operator.nickname;
            this.replyInfo = {
              id: this.highlightItem.id,
              type: this.highlightItem.type
            };
            this.$refs.replyBar.$el.querySelector('#textarea').focus();
            break
          case 2:
            console.log("删除评论、回复")
            break
        }
        this.showPop = [-1, -1]
      }
      ,
      handleClickBack() {
        // this.$router.go(-1)
        if (store.state.pushRouter.routeChanged) {
          console.log("!", store.state.pushRouter.routeChanged)
          this.$router.go(-1)
          // console.log("大概有进入detail的router-history")
        } else {
          // console.log("应该没有进入detail的router-history", store.state.pushRouter.routeChanged, store.state.pushRouter.defaultHistoryLength, history.length)
          this.$router.push('/')
        }
      }
      ,
      judgeAndMoveToCommentBlocks(judge = true) {
        let query = this.query()
        if (!judge
          || ('elComment' in query && query.elComment === "true")//query的特殊性
        ) {
          console.log("锚过来啊");
          let el = this.scrollBody;
          el.scrollTop = el.querySelector('#comment-blocks').offsetTop - 50;
        }
      }
      ,
      handleClickReply(item) {
        store.commit("pushRouter/SET_CARD_ITEM", item)
        this.$router.push({
          path: '/detail/comment',
          query: item.info
        })
      }
      ,
      handleClickCard() {//该函数名不具有实际意义，仅供sharebarMixin统一调用
        this.judgeAndMoveToCommentBlocks(false)
      }
      ,
      judgeDeleteRight(commentItem) {
        let userinfo = getUserInfoFromToken()
        return (
          userinfo.id === commentItem.operator.id//要么是自己
          || userinfo.id === this.news.publisher.id//要么是msg的作者
        )
      }
      ,
      handleClickCommentCard([clickX, clickY], [blockIndex, cardIndex], item) {
        if (this.showPop[0] === blockIndex && this.showPop[1] === cardIndex) {
          this.showPop = [-1, -1]
          return
        }
        this.highlightItem = item;//暂存，好在点击回复的时候存到回复框去
        this.showPopDeleteBtn = this.judgeDeleteRight(item);//有没有删除权限
        this.copyContent = item.content;//暂存，好在点击复制的时候存到剪切板去
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
    mixins: [sharebarMixin]
  }
</script>

<style lang="scss" scoped>
  @import 'msgDetail';
</style>
