<template>
  <MsgDetail
    headerTitle="动态详情"
    :raw="raw"
    @onClickLike="handleClickLike"
  >
    <user-message-card
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

  export default {
    name: "userMsgDetail",
    store,
    components: {MsgDetail, UserMessageCard},
    data: () => ({
      msg: {
        info: {
          type: 0,
          id: 0
        },
        topic: {
          id: 0,
          name: ""
        },
        content: "",
        photos: [],
        author: {
          id: 0,
          avatar: "",
          name: ""
        },
        publishTime: "",
        shareInfo: {
          like: 0,
          comment: 0,
          share: 0
        },
        showStar: false
      }
    }),
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
        if (!!store.state.pushRouter.cardItem) {
          //vuex里面存有状态，直接渲染
          this.msg = store.state.pushRouter.cardItem
        } else {
          let {type, id} = this.$route.params
          //老老实实axios
          console.log("此处应该有ajax")
        }
      },
      handleClickLike(info) {
        console.log("userMsgDetail - handleClickLike", info)
      },
      handleClickShareButton(index) {
        console.log("userMsgDetail - handleClickShareButton", index, this.msg.info)
      }
    },
    mixins: [mock]
  }
</script>

<style scoped>

</style>
