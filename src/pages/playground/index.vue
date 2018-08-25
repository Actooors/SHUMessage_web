<template>
  <ViewBox ref="playground">
    <div slot="header" class="topBar" id="topBar">
      <Search
        placeholder="搜索"
        @on-submit="handleSearch"
        auto-scroll-to-top
        ref="search"
        v-model="searchValue"
        cancel-text="返回"
        id="search"
        class="animate-quick"
      >
        <search-result :value="searchValue"></search-result>
      </Search>
      <tab
        :line-width="2"
        custom-bar-width="20px"
        bar-active-color="#2196F3"
        active-color="#2196F3"
        v-model="tabIndex"
        class="topBar-tab animate-quick"
        id="tab"
      >
        <tab-item @on-item-click="(index)=>{handleClickTabItem('/playground/attention',index)}">关注</tab-item>
        <tab-item @on-item-click="(index)=>{handleClickTabItem('/playground/recommend',index)}">推荐</tab-item>
        <tab-item @on-item-click="(index)=>{handleClickTabItem('/playground/neighborhood',index)}">附近</tab-item>
      </tab>
    </div>
    <keep-alive>
      <router-view id="view"></router-view>
    </keep-alive>
  </ViewBox>
</template>

<script>
  import {ViewBox, Tab, TabItem, Search, Scroller, Spinner} from 'vux'
  import SearchResult from 'components/searchResult/searchResult'
  import stickybits from 'stickybits'
  import {playground as store} from 'store/store'
  import {mapState} from 'vuex'

  export default {
    name: "playground",
    store,
    components: {...{ViewBox, Tab, TabItem, Search, Scroller, Spinner}, SearchResult},
    data: () => ({
      searchValue: "",
      tabIndex: 1,
      timer: null,
      scrollTop: -1,
      offset: 0,
      slowScrollHeight: "0"
    }),
    computed:mapState(['nodeTab','nodeTopBar','nodeTabbar','searchHeight']),
    created() {
      this.initTab()
    },
    mounted() {
      stickybits('.topBar');
      this.initHeaderScroll();
    },
    methods: {
      initHeaderScroll() {
        let search = document.querySelector('#search')
        search.style.position = "relative"
        store.commit('SET_SEARCH_HEIGHT',search.offsetHeight)
        store.commit('SET_NODE_TAB',document.querySelector('#tab'))
        store.commit('SET_NODE_TOPBAR',document.querySelector("#topBar"))
        store.commit('SET_NODE_TABBAR',document.querySelector('#tabbar'))
        //禁用viewBoxBody的滚动
        let viewBoxBody = this.$refs.playground.getScrollBody()
        viewBoxBody.style.overflow = 'hidden'
        viewBoxBody.parentElement.style.overflow = 'hidden'
      },
      handleClickTabItem(pushExpression) {
        this.$router.push(pushExpression)
      },
      handleSearch(value) {
        console.log("search", value)
        this.$refs.search.setBlur()
      },
      initTab(autoMatch = true) {
        // 从后向前遍历，有tabIndex的就更新，将当前选中的tab自动与地址匹配，并返回tabIndex
        let len = this.$route.matched.length
        let tabIndex = -1;
        for (let i = len - 1; i >= 0; i--) {
          Number.isInteger(this.$route.matched[i].meta.tabIndex) && (tabIndex = this.$route.matched[i].meta.tabIndex)
        }
        if (tabIndex > -1 && this.tabIndex !== tabIndex) {
          autoMatch && (this.tabIndex = tabIndex)
          autoMatch && this.$nextTick(() => {
            this.scrollTop = this.scrollTops[tabIndex]
            console.log('to', this.scrollTop)
          })
        }
        if (!autoMatch) {
          console.log("false")
        }
        return tabIndex
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "index";
</style>
