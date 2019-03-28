<!--TODO: 开发header的动画效果，不要那么卡顿-->
<template>
  <div
    ref="playground"
    style="height:100%"
  >
    <div
      class="topBar animate-quick"
      id="topBar"
    >
      <Search
        placeholder="搜索"
        @on-submit="handleSearch"
        auto-scroll-to-top
        ref="search"
        v-model="searchValue"
        cancel-text="返回"
        id="search"
      >
        <search-result :value="searchValue"></search-result>
      </Search>
    </div>
    <tab
      :line-width="2"
      custom-bar-width="20px"
      bar-active-color="#2196F3"
      active-color="#2196F3"
      v-model="tabIndex"
      class="tab animate-quick"
      id="tab"
    >
      <tab-item @on-item-click="(index)=>{handleClickTabItem('/playground/attention',index)}">新闻</tab-item>
      <tab-item @on-item-click="(index)=>{handleClickTabItem('/playground/recommend',index)}">推荐</tab-item>
      <tab-item @on-item-click="(index)=>{handleClickTabItem('/playground/neighborhood',index)}">热门</tab-item>
    </tab>
    <keep-alive>
      <router-view class="playground-content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {ViewBox, Tab, TabItem, Search, Spinner} from 'vux'
  import SearchResult from 'components/searchResult/searchResult'
  import stickybits from 'stickybits'
  import store from 'store/store'
  import {mapState} from 'vuex'

  export default {
    name: "playground",
    store,
    components: {...{ViewBox, Tab, TabItem, Search, Spinner}, SearchResult},
    data: () => ({
      searchValue: "",
      tabIndex: 1,
      offset: 0,
      slowScrollHeight: "0"
    }),
    computed: mapState('playground', ['nodeTab', 'nodeTopBar', 'nodeTabbar', 'searchHeight']),
    created() {
      this.initTab()
    },
    mounted() {
      stickybits('.topBar');
      this.initHeaderScroll();
    },
    methods: {
      initHeaderScroll() {
        // let search = document.querySelector('#search')
        store.commit('playground/SET_SEARCH_HEIGHT', search.offsetHeight)
        store.commit('playground/SET_NODE_TAB', document.querySelector('#tab'))
        store.commit('playground/SET_NODE_TOPBAR', document.querySelector("#topBar"))
        store.commit('playground/SET_NODE_TABBAR', document.querySelector('#tabbar'))
      },
      handleClickTabItem(pushExpression) {
        this.$router.push(pushExpression)
        this.$store.commit("playground/SET_PLAYGROUND_NOW", this.$route.fullPath.substring(this.$route.fullPath.lastIndexOf('/')))
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
          this.$store.commit("playground/SET_PLAYGROUND_NOW", this.$route.fullPath.substring(this.$route.fullPath.lastIndexOf('/')))
        }
        return tabIndex
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "index";
</style>

<style lang="scss">
  .playground-content {
    .scrollComponentBodyContent, .pulltorefresh--ptr {
      position: relative;
      top: 44px;
      left: 0;
    }
    .pulltorefresh--ptr {
      z-index: 1;
    }
    .spinner-loadIcon {
      top: 53px !important;
    }
  }
</style>
