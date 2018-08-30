<template>
  <MsgDetail
    headerTitle="消息详情"
    :raw="raw"
    @onClickLike="handleClickLike"
  >
    <common-card
      v-if="msgLoaded"
      :topic="msg.topic"
      :content="msg.content"
      :author="msg.author"
      :extraInfo="msg.publishTime||msg.extraInfo"
      :shareInfo="msg.shareInfo"
      :lazy-load=false
      @onClickShareButton="handleClickShareButton"
    ></common-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import CommonCard from 'components/commonCard/commonCard'
  import store from "store/store";
  import {commonDetail as mock} from "./mock";
  import ajaxMixin from "./ajaxMixin";

  export default {
    name: "commonMsgDetail",
    store,
    components: {MsgDetail, CommonCard},
    data: () => ({}),
    methods: {
      handleClickLike(info) {
        console.log("commonMsgDetail - handleClickLike", info)
      },
      handleClickShareButton(index) {
        console.log("commonMsgDetail - handleClickShareButton", index, this.msg.info)
      }
    },
    mixins: [mock, ajaxMixin]
  }
</script>

<style scoped>

</style>
