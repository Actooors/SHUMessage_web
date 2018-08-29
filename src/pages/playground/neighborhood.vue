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
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :shareInfo="item.shareInfo"
      :publishTime="item.publishTime"
      :position="item.position"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item.info)"
      class="neighborhood-card"
    ></user-message-card>
  </scroll>
</template>

<script>
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import {neighborhood as mock} from "./mock"
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";

  export default {
    name: "neighborhood",
    store,
    components: {UserMessageCard, Scroll},
    mixins: [mock, scrollMixin],
    methods: {
      handleClickCard(index) {
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: '/userMsgDetail',
          query: that.cards[index].info
        })
      },
      handleClickShareButton(index, info) {
        console.log("neighborhood - handleClickShareButton", index, info)
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
