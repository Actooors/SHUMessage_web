<template>
  <scroll
    @on-scroll="handleScroll"
    :noMore="noMore"
    :pulldownCallback="handlePulldownLoading"
    :pullupCallback="handlePullupLoading"
  >
    <Spinner type="ripple" class="center-spinner" v-if="!cards.length && scrollerStatus.pulldownStatus==='default'"></Spinner>
    <user-message-card
      v-for="(item,index) of cards"
      :key="item.value"
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item)"
      class="neighborhood-card"
      @onClickImg="handleClickCardImg"
    ></user-message-card>
    <share
      v-model="shareOptions.show"
      :url="shareOptions.url"
      :title="shareOptions.title"
      :digest="shareOptions.digest"
    ></share>
    <div v-transfer-dom>
      <previewer :list="previewerList" ref="NeiborhoodPreviewer" :options="previewerOptions"
                 :key="previewerUpdateReminder"></previewer>
    </div>
  </scroll>
</template>

<script>
  import {Previewer} from 'vux'
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import {neighborhood as mock} from "./mock"
  import scrollMixin from './scrollMixin'
  import previewerMixin from './previewerMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";
  import sharebarMixin from '../../assets/js/sharebarMixin'
  import Share from 'components/share/share'
  import {Spinner} from 'vux'

  export default {
    name: "neighborhood",
    store,
    components: {...{Spinner}, Previewer, UserMessageCard, Scroll, Share},
    mixins: [mock, scrollMixin, sharebarMixin, previewerMixin],
    methods: {
      handleClickCard(index, info) {
        if (index === null) {
          index = this.cards.findIndex(card => card.info === info)
        }
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: `/msgDetail`,
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
