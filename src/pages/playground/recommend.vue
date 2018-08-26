<template>
  <scroll
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <playground-card
      v-for="(item,index) of cards"
      :key="item.value"
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.extraInfo"
      :shareInfo="item.shareInfo"
      @click.native="handleClickCard(index)"
    ></playground-card>
  </scroll>
</template>

<script>
  import PlaygroundCard from "components/playgroundCard/playgroundCard"
  import {recommend as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";

  export default {
    name: "recommend",
    components: {PlaygroundCard, Scroll},
    mixins: [mock, scrollMixin],
    store,
    methods: {
      handleClickCard(index) {
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: '/commonMsgDetail',
          query: that.cards[index].info
        })
      }
    }
  }
</script>

<style scoped>

</style>
