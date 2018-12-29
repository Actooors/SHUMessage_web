<template>
  <scroll
    v-model="scrollerStatus"
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <Spinner type="ripple" class="center-spinner"
             v-if="!cards.length && scrollerStatus.pulldownStatus==='default'"></Spinner>
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

  export default {
    name: "attention",
    store,
    components: {...{Spinner}, CommonCard, Scroll, Share},
    mixins: [scrollMixin, sharebarMixin],
    data: () => ({
      cards: [],
      listApi: '/news/newsList'
    }),
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
        let that = this
        this.$axios({
          url: apiRoot + this.listApi,
          method: "get",
          params: {
            page: 0,
            pageSize: 20
          }
        }).then((res) => {
          this.cards = res.data.data.cards
          this.$nextTick(() => {
            that.$refs.scroll.reset()
          })
        }).catch((err) => {
          console.error(err)
        })
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
  .center-spinner {
    margin: 0 auto;
    display: table;
    position: relative;
    bottom: -25px;
  }
</style>
