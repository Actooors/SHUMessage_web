<template>
  <MsgDetail
    headerTitle="动态详情"
    :raw="raw"
    @onClickLike="handleClickLike"
    :replyPlaceholder="`回复${msg.author.name}:`"
    @onSubmitReply="handleComment(...arguments,msg.info)"
  >
    <user-message-card
      class="userMsgDetail-card"
      v-if="msgLoaded"
      :msg="msg"
      @onClickShareButton="handleClickShareButton(...arguments,msg.info)"
    ></user-message-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import UserMessageCard from "components/userMessageCard/userMessageCard";
  import store from "store/store";
  import {commonDetail as mock} from "./mock";
  import ajaxMixin from "./ajaxMixin";
  import sharebarMixin from "assets/js/sharebarMixin";

  export default {
    name: "userMsgDetail",
    store,
    components: {MsgDetail, UserMessageCard},
    data: () => ({}),
    methods: {
      handleClickLike(info) {
        console.log("userMsgDetail - handleClickLike", info)
      }
    },
    mixins: [mock, ajaxMixin, sharebarMixin]
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/varies';

  .userMsgDetail-card {
    margin-bottom: 8px;
    box-shadow: 0 0 1rem .1rem rgba(0, 0, 0, .05);
  }

</style>
