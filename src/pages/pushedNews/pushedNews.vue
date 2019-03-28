<template>
  <ViewBox ref="seoViewBox" bodyPaddingBottom="30px" class="needsscroll">
    <x-header slot="header" class="theme-XHeader-blue"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              id="pushedNews-XHeader"
    ><span style="font-size:16px">Message每日推送</span>
      <div slot="left" style="position: relative" @click="handleClickBack">
        <i class="icon-home iconfont icon" style="font-size:18px"></i>
      </div>
      <sub slot="right" v-if="pushDate">{{pushDate}}</sub>
      <span class="title">{{$route.query.title}}</span>
    </x-header>
    <common-card
      v-for="(item,index) of cards"
      :key="item.value"
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item)"
    ></common-card>
    <LoadMore :show-loading=false tip="看完了,去主页看看吧!" @click.native="handleClickBack" v-if="cards.length>0"></LoadMore>
    <div class="more-loading" v-else>
      <Spinner type="lines"></Spinner>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, LoadMore, Spinner} from 'vux'
  import CommonCard from "components/commonCard/commonCard"
  import sharebarMixin from "assets/js/sharebarMixin";
  import stickybits from 'stickybits'

  export default {
    name: "pushedNews",
    components: {
      ...{ViewBox, XHeader, LoadMore, Spinner},
      CommonCard
    },
    mixins: [sharebarMixin],
    data: () => ({
      cards: [],
      pushDate: '03-27'
    }),
    mounted() {
      this.loadData();
      stickybits('.vux-header')
      document.querySelector('#vux_view_box_body').style = "height:calc(100vh - 47px)"
    },
    methods: {
      handleClickCard(index, info) {
        if (index === null) {
          index = this.cards.findIndex(card => card.info === info)
        }
        this.$store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: '/detail/msg',
          query: {...that.cards[index].info, elComment: !!info}
        })
      },
      loadData() {
        const that = this;
        this.$axios({
          url: apiRoot + '/news/interestNews',
          method: "get",
          params: {
            wd:this.$route.query.wd
          }
        }).then((res) => {
          //营造数据刷新的效果
          that.cards.length = 0;
          setTimeout(() => {
            that.cards = res.data.data.cards
          }, 20)
        })
      },
      handleClickBack() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  #pushedNews-XHeader {
    z-index: 1
  }
</style>
