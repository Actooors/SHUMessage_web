<template>
  <scroll
    @on-scroll="handleScroll"
    :noMore="noMore"
    :pulldownCallback="handlePulldownLoading"
    :pullupCallback="handlePullupLoading"
    :showLoadIcon="showLoadIcon"
  >
    <Spinner type="ripple" class="center-spinner"
             v-if="!cards.length && scrollerStatus.pulldownStatus==='default'"></Spinner>
    <user-message-card
      v-for="(item,index) of cards"
      :key="item.value"
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item)"
      class="neighborhood-card"
      @onClickImg="handleClickCardImg"
    ></user-message-card>
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
  import sharebarMixin from '../../assets/js/sharebarMixin/index'
  import {Spinner} from 'vux'
  import xhrMixin from './xhrMixin'

  export default {
    name: "neighborhood",
    store,
    components: {...{Spinner}, Previewer, UserMessageCard, Scroll},
    mixins: [mock, scrollMixin, sharebarMixin, previewerMixin, xhrMixin],
    data: () => ({
      showLoadIcon: true
    }),
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.showLoadIcon = false
      },
      handleClickCard(index, info) {
        if (index === null) {
          index = this.cards.findIndex(card => card.info === info)
        }
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: `/detail/msg`,
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
