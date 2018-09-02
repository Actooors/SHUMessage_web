<template>
  <scroll
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <common-card
      v-for="(item,index) of cards"
      :key="item.value"
      :item="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item.info)"
    ></common-card>
  </scroll>
</template>

<script>
  import CommonCard from "components/commonCard/commonCard"
  import {recommend as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";

  export default {
    name: "recommend",
    components: {CommonCard, Scroll},
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
      },
      handleClickShareButton(index, info) {
        console.log("recommend - handleClickShareButton", index, info)
      }
    }
  }
</script>

<style scoped>

</style>
