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
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item.info,item.footprint,item.shareInfo)"
    ></common-card>
  </scroll>
</template>

<script>
  import CommonCard from "components/commonCard/commonCard"
  import {recommend as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";
  import sharebarMixin from '../../assets/js/sharebarMixin'

  export default {
    name: "recommend",
    components: {CommonCard, Scroll},
    mixins: [mock, scrollMixin, sharebarMixin],
    store,
    methods: {
      handleClickCard(index, info) {
        if (index === null) {
          index = this.cards.findIndex(card => card.info === info)
        }
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: '/commonMsgDetail',
          query: {...that.cards[index].info, elComment: true}
        })
      }
    }
  }
</script>

<style scoped>

</style>
