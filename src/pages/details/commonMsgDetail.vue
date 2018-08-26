<template>
  <MsgDetail>
    <playground-card
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.publishTime"
      :shareInfo="item.shareInfo"
    ></playground-card>
  </MsgDetail>
</template>

<script>
  import MsgDetail from 'components/msgDetail/msgDetail'
  import PlaygroundCard from 'components/playgroundCard/playgroundCard'
  import store from "store/store";

  export default {
    name: "commonMsgDetail",
    store,
    components: {MsgDetail, PlaygroundCard},
    data: () => ({
      item: {}
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
        }
      }
    }
  }
</script>

<style scoped>

</style>
