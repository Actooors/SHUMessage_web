<template>
  <scroll
    @on-scroll="handleScroll"
    :noMore="!!newses.length && !newsesConnection.pageInfo.hasNextPage"
    :pulldownCallback="()=>loadData(true)"
    :pullupCallback="()=>loadData(false)"
    :showLoadIcon="!newses.length && $apollo.queries.newses.loading"
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
  import NEWSES from '../../graphql/newses.gql'
  import NEWSES_CONNECTION from '../../graphql/newsesConnection.gql'

  export default {
    name: "attention",
    store,
    components: {...{Spinner}, CommonCard, Scroll},
    mixins: [scrollMixin, sharebarMixin, xhrMixin],
    apollo: {
      newses: {
        query: NEWSES,
        variables: {after: null, uid: UID}
      },
      newsesConnection: {
        query: NEWSES_CONNECTION,
        variables: {after: null}
      }
    },
    data: () => ({
      newses: [],
      newsesConnection: {pageInfo: {hasNextPage: true, endCursor: null}},
    }),
    methods: {
      async loadData(newRound = false) {
        if (!this.newsesConnection.pageInfo.hasNextPage && !newRound) {
          return
        }
        let pNewses = this.$apollo.queries.newses.fetchMore({
          variables: {
            after: newRound ? null : this.newsesConnection.pageInfo.endCursor,
            uid: UID
          },
          updateQuery(previousResult, {fetchMoreResult}) {
            if (newRound) {
              return fetchMoreResult;
            }
            return {
              newses: [...previousResult.newses, ...fetchMoreResult.newses]
            };
          }
        });
        let pNewsesConnection = this.$apollo.queries.newsesConnection.fetchMore({
          variables: {
            after: newRound ? null : this.newsesConnection.pageInfo.endCursor
          },
          updateQuery(previousResult, {fetchMoreResult}) {
            return fetchMoreResult;
          }
        });
        return Promise.all([pNewses, pNewsesConnection])
      },
      handleClickCard(index, info) {
        if (index === null) {
          index = this.newses.findIndex(newses => newses.id === info.id && newses.type === info.type)
        }
        store.commit("pushRouter/SET_CARD_ITEM", this.newses[index]);
        let that = this;
        this.$router.push({
          path: '/detail/msg',
          query: {id: that.newses[index].id, type: that.newses[index].type, elComment: !!info}
        })
      }
    }
  }
</script>

<style scoped>

</style>
