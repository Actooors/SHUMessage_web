<template>
  <scroll
    @on-scroll="handleScroll"
    :noMore="noMore"
    :pulldownCallback="handlePulldownLoading"
    :pullupCallback="handlePullupLoading"
    :showLoadIcon="showLoadIcon"
  >
    <common-card
      v-for="(item,index) of cards"
      :key="item.value"
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item)"
    ></common-card>
    <share
      v-model="shareOptions.show"
      :url="shareOptions.url"
      :title="shareOptions.title"
      :digest="shareOptions.digest"
    ></share>
  </scroll>
</template>

<script>
  import CommonCard from "components/commonCard/commonCard"
  import {recommend as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from "store/store";
  import sharebarMixin from '../../assets/js/sharebarMixin'
  import Share from 'components/share/share'
  import {Spinner} from 'vux'
  import xhrMixin from './xhrMixin'

  export default {
    name: "recommend",
    components: {...{Spinner}, CommonCard, Scroll, Share},
    mixins: [mock, scrollMixin, sharebarMixin, xhrMixin],
    store,
    mounted() {
      this.loadData();
    },
    data: () => ({
      showLoadIcon: true
    }),
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
          path: '/msgDetail',
          query: {...that.cards[index].info, elComment: !!info}
        })
      }
    }
  }
</script>

<style scoped>

</style>
