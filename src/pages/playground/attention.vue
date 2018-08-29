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
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.extraInfo"
      :publishTime="item.publishTime"
      :shareInfo="item.shareInfo"
      :media="item.media"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item.info)"
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

  export default {
    name: "attention",
    store,
    components: {CommonCard, Scroll},
    mixins: [scrollMixin],
    data: () => ({
      cards: []
    }),
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
        axios({
          url: apiRoot + "/news/newsList",
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
