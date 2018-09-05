<template>
  <scroll
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <user-message-card
      v-for="(item,index) of cards"
      :key="item.value"
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item)"
      class="neighborhood-card"
    ></user-message-card>
    <share
      v-model="shareOptions.show"
      :url="shareOptions.url"
      :title="shareOptions.title"
      :digest="shareOptions.digest"
    ></share>
  </scroll>
</template>

<script>
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import {neighborhood as mock} from "./mock"
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";
  import sharebarMixin from '../../assets/js/sharebarMixin'
  import Share from 'components/share/share'

  export default {
    name: "neighborhood",
    store,
    components: {UserMessageCard, Scroll, Share},
    mixins: [mock, scrollMixin, sharebarMixin],
    methods: {
      handleClickCard(index, info) {
        if (index === null) {
          index = this.cards.findIndex(card => card.info === info)
        }
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: `/userMsgDetail`,
          query: {...that.cards[index].info, elComment: !!info}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/varies';

  .neighborhood-card {
    border-bottom: $--theme-gray-light3 solid 1px;
  }
</style>
