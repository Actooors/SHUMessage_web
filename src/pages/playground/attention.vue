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
  // import {attention as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from 'store/store'
  import axios from 'axios'
  import sharebarMixin from '../../assets/js/sharebarMixin'

  export default {
    name: "attention",
    store,
    components: {CommonCard, Scroll},
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
        axios({
          url: apiRoot + this.listApi,
          method: "get",
          params: {
            page: 0,
            pageSize: 20
          }
        }).then((res) => {
          this.cards = res.data.data.cards
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
          path: '/commonMsgDetail',
          query: {...that.cards[index].info, elComment: true}
        })
      }
    }
  }
</script>

<style scoped>

</style>
