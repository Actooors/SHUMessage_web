<template>
  <scroll
    @on-scroll="handleScroll"
    :noMore="!this.newsesConnection.pageInfo.hasNextPage"
    :pulldownCallback="()=>handlePulldownLoading('/news/newsList')"
    :pullupCallback="loadMore"
    :showLoadIcon="!newses.length"
    body-padding-bottom="47px"
  >
    <common-card
      v-for="(item,index) of newses"
      :key="item.id"
      :msg="item"
      @click.native="handleClickCard(index)"
      @onClickShareButton="handleClickShareButton(...arguments,item)"
    ></common-card>
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
  import xhrMixin from './xhrMixin'
  import gql from 'graphql-tag'

  export default {
    name: "attention",
    store,
    components: {...{Spinner}, CommonCard, Scroll},
    mixins: [scrollMixin, sharebarMixin, xhrMixin],
    apollo: {
      newses: {
        query: gql`
        query($after: String){
          newses(after: $after, first:20) {
            id
            description
            media_type
            media_title
            media_url
            media_img
            publisher {
              id
              nickname
              avatar
            }
            shared_num
            comment_num
            liked_num
            labels {
              name
            }
            publish_time
          }
        }`,
        variables: {after: null}
      },
      newsesConnection: {
        query: gql`
         query($after: String){
            newsesConnection(after:$after ,first:20){
              pageInfo{
                hasNextPage
                endCursor
              }
            }
         }
        `,
        variables: {after: null}
      }
    },
    data: () => ({
      newses: [],
      newsesConnection: {pageInfo: {hasNextPage: true}},
      cards: [],
      showLoadIcon: true
    }),
    mounted() {
      // this.loadData()
    },
    watch: {
      newses(val, oval) {
        console.log(oval, val)
      }
    },
    methods: {
      // loadData() {
      //   this.xhrRequestList('/news/newsList').finally(() => {
      //     this.showLoadIcon = false
      //   });
      // },
      async loadMore() {
        if (!this.newsesConnection.pageInfo.hasNextPage) {
          return
        }
        let p1 = this.$apollo.queries.newses.fetchMore({
          variables: {
            after: this.newsesConnection.pageInfo.endCursor
          },
          updateQuery(previousResult, {fetchMoreResult}) {
            return {
              newses: [...previousResult.newses, ...fetchMoreResult.newses]
            };
          }
        });
        let p2 = this.$apollo.queries.newsesConnection.fetchMore({
          variables: {
            after: this.newsesConnection.pageInfo.endCursor
          },
          updateQuery(previousResult, {fetchMoreResult}) {
            return fetchMoreResult;
          }
        });
        return Promise.all([p1, p2])
      },
      handleClickCard(index, info) {
        if (index === null) {
          index = this.cards.findIndex(card => card.info === info)
        }
        store.commit("pushRouter/SET_CARD_ITEM", this.cards[index])
        let that = this;
        this.$router.push({
          path: '/detail/msg',
          query: {...that.cards[index].info, elComment: !!info}
        })
      }
    }
  }
</script>

<style scoped>

</style>
