<template>
  <MsgDetail
    ref="maincard"
    headerTitle="消息详情"
    :raw="raw"
    @onClickLike="handleClickShareButton"
    :replyPlaceholder="`回复${replyName}:`"
    @loadMore="handleLoadMore"
    :noMore="noMore"
    :loadingMore="loadingMoreComments"
    :msgLoaded="msgLoaded"
    @onSubmitReply="handleComment(...arguments,replyInfo)"
    :shareOptions="shareOptions"
    @onClickPopReply="handleClickPopReply"
  >
    <common-card
      v-if="msgLoaded"
      :msg="msg"
      @onClickShareButton="handleClickShareButton(...arguments,msg)"
    ></common-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import CommonCard from 'components/commonCard/commonCard'
  import store from "store/store";
  import sharebarMixin from "assets/js/sharebarMixin";
  import ajaxMixin from "./ajaxMixin";

  export default {
    name: "commonMsgDetail",
    store,
    components: {MsgDetail, CommonCard},
    data: () => ({
      replyName: "",
      replyInfo: {}
    }),
    watch: {
      msgLoaded() {
        this.replyName = this.msg.author.name
        this.replyInfo = this.msg.info
      }
    },
    methods: {
      handleClickPopReply(item) {
        this.replyName = item.author.name
        this.replyInfo = item.info
      }
    },
    mixins: [ajaxMixin, sharebarMixin]
  }
</script>

<style scoped>

</style>
