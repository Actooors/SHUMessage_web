<template>
  <scroll
    @on-scroll="handleScroll"
    :xhr-path="xhrPath"
    :xhr-page-size="10"
    :xhr-params-format="{page:'page',pageSize:'pageSize'}"
    xhr-data-array-path="data.cards"
    xhr-no-more-equal="code==='FAILED'"
    xhr-no-more-tip="没有更多的新闻啦"
    body-padding-bottom="47px"
  >
    <template slot-scope="props">
      <common-card
        v-for="(item,index) of props.dataArray"
        :key="item.value"
        :msg="item"
        @clickTopic="$router.push({path:'/group',query:{id:item.topic.id}})"
        @click.native="handleClickCard(item.info)"
        @onClickShareButton="handleClickShareButton(...arguments,item)"
      ></common-card>
    </template>
  </scroll>
</template>

<script>
  import CommonCard from "components/commonCard/commonCard"
  // import {attention as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  import store from 'store/store'
  import sharebarMixin from '../../assets/js/sharebarMixin/index'
  import {Spinner} from 'vux'

  export default {
    name: "attention",
    store,
    components: {...{Spinner}, CommonCard, Scroll},
    mixins: [scrollMixin, sharebarMixin],
    data: () => ({
      showLoadIcon: true
    }),
    computed: {
      xhrPath() {
        return apiRoot + '/news/newsList';
      }
    },
    methods: {
      handleClickCard(info) {
        // if (index === null) {
        //   index = this.cards.findIndex(card => card.info === info)
        // }
        // store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        this.$store.commit('pushRouter/SET_REFRESH_MSG_DETAIL', true);
        this.$router.push({
          path: '/detail/msg',
          query: {...info, elComment: false}
        })
      }
    }
  }
</script>

<style scoped>

</style>
