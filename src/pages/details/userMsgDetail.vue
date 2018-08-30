<template>
  <MsgDetail
    headerTitle="动态详情"
    :raw="raw"
    @onClickLike="handleClickLike"
  >
    <user-message-card
      class="userMsgDetail-card"
      v-if="msgLoaded"
      :publishTime="msg.publishTime"
      :position="msg.position"
      :topic="msg.topic"
      :content="msg.content"
      :author="msg.author"
      :shareInfo="msg.shareInfo"
      :lazy-load=false
      @onClickShareButton="handleClickShareButton"
    ></user-message-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import UserMessageCard from "components/userMessageCard/userMessageCard";
  import store from "store/store";
  import {commonDetail as mock} from "./mock";
  import ajaxMixin from "./ajaxMixin";

  export default {
    name: "userMsgDetail",
    store,
    components: {MsgDetail, UserMessageCard},
    data: () => ({}),
    methods: {
      handleClickLike(info) {
        console.log("userMsgDetail - handleClickLike", info)
      },
      handleClickShareButton(index) {
        console.log("userMsgDetail - handleClickShareButton", index, this.msg.info)
      }
    },
    mixins: [mock, ajaxMixin]
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/varies';

  .userMsgDetail-card {
    margin-bottom: 8px;
    box-shadow: 0 0 1rem .1rem rgba(0, 0, 0, .05);
  }

</style>
