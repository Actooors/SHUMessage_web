<template>
  <MsgDetail
    headerTitle="评论详情"
    :show-comment=false
    :raw="raw"
    @onClickLike="handleClickShareButton"
    @onSubmitReply="handleComment(...arguments,msg.info)"
    :replyPlaceholder="`回复${msg.author.name}:`"
  >
    <comment-card
      v-if="msgLoaded"
      :content="msg.content"
      :author="msg.author"
      :publishTime="msg.publishTime"
      :photos="msg.photos"
      :shareInfo="msg.shareInfo"
      :replies="msg.replies"
      :info="msg.info"
      :footprint="msg.footprint"
      :showComment=false
      @onClickLike="handleClickShareButton(0,msg.info,msg.footprint,msg.shareInfo)"
    ></comment-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import CommentCard from "components/commentCard/commentCard";
  import store from "store/store";
  import {commentDetail as mock} from "./mock";
  import ajaxMixin from "./ajaxMixin";
  import sharebarMixin from "assets/js/sharebarMixin"

  export default {
    name: "commentDetail",
    store,
    components: {MsgDetail, CommentCard},
    data: () => ({}),
    methods: {},
    mixins: [mock, ajaxMixin, sharebarMixin]
  }
</script>

<style scoped>

</style>
