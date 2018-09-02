<template>
  <MsgDetail
    headerTitle="消息详情"
    :raw="raw"
    @onClickLike="handleClickShareButton"
    :replyPlaceholder="`回复${msg.author.name}:`"
    @loadMore="handleLoadMore"
    :noMore="noMore"
    :loadingMore="loadingMoreComments"
    :msgLoaded="msgLoaded"
  >
    <common-card
      v-if="msgLoaded"
      :msg="msg"
      @onClickShareButton="handleClickShareButton(...arguments,msg.info)"
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
    data: () => ({}),
    methods: {},
    mixins: [ajaxMixin, sharebarMixin]
  }
</script>

<style scoped>

</style>
