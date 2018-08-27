<template>
  <MsgDetail
    headerTitle="消息详情"
    :raw="raw"
  >
    <playground-card
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.publishTime||item.extraInfo"
      :shareInfo="item.shareInfo"
      :lazy-load=false
    ></playground-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import PlaygroundCard from 'components/playgroundCard/playgroundCard'
  import store from "store/store";
  import {commonDetail as mock} from "./mock";

  export default {
    name: "commonMsgDetail",
    store,
    components: {MsgDetail, PlaygroundCard},
    data: () => ({
      item: {
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
          this.item = store.state.pushRouter.cardItem
        } else {
          let {type, id} = this.$route.params
          //老老实实axios
          console.log("此处应该有ajax")
        }
      }
    },
    mixins: [mock]
  }
</script>

<style scoped>

</style>
