<template>
  <scroll
    @on-scroll="handleScroll"
    :noMore="noMore"
    :pulldownCallback="handlePulldownLoading"
    :pullupCallback="handlePullupLoading"
    :scrollTop="scrollHeight"
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
  // import {attention as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from 'store/store'

  import sharebarMixin from '../../assets/js/sharebarMixin'
  import Share from 'components/share/share'
  import {Spinner} from 'vux'
  import xhrMixin from './xhrMixin'

  export default {
    name: "attention",
    store,
    components: {...{Spinner}, CommonCard, Scroll, Share},
    mixins: [scrollMixin, sharebarMixin, xhrMixin],
    data: () => ({
      cards: [],
      showLoadIcon: true
    }),
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.xhrRequestList('/news/newsList').finally(() => {
          this.showLoadIcon = false
        });
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
