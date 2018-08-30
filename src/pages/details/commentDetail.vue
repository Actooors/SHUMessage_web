<template>
  <MsgDetail
    headerTitle="评论详情"
    :show-comment=false
    :raw="raw"
    @onClickLike="handleClickLike"
  >
    <comment-card
      v-if="msgLoaded"
      :content="msg.content"
      :author="msg.author"
      :publishTime="msg.publishTime"
      :photos="msg.photos"
      :like="msg.like"
      :replies="msg.replies"
      :info="msg.info"
      :showComment=false
      @onClickLike="handleClickLike(msg.info)"
    ></comment-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import CommentCard from "components/commentCard/commentCard";
  import store from "store/store";
  import {commentDetail as mock} from "./mock";
  import ajaxMixin from "./ajaxMixin";

  export default {
    name: "commentDetail",
    store,
    components: {MsgDetail, CommentCard},
    data: () => ({}),
    methods: {
      handleClickLike(info) {
        console.log("commentDetail - handleClickLike", info)
      }
    },
    mixins: [mock, ajaxMixin]
  }
</script>

<style scoped>

</style>
