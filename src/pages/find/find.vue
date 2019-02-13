<template>
  <ViewBox>
    <div
      slot="header"
      class="topBar"
    >
      <Search
        placeholder="搜索"
        @on-submit="handleSearch"
        auto-scroll-to-top
        ref="search"
        v-model="searchValue"
        cancel-text="返回"
      ></Search>
    </div>
    <Tab
      :line-width="2"
      custom-bar-width="20px"
      bar-active-color="#2196F3"
      active-color="#2196F3"
      v-model="tabIndex"
      class="topBar-tab animate-quick"
    >
      <tab-item>推荐</tab-item>
      <tab-item>趣味</tab-item>
      <tab-item>科技</tab-item>
      <tab-item>资讯</tab-item>
      <tab-item>游戏</tab-item>
      <tab-item>动漫</tab-item>
      <tab-item>体育</tab-item>
      <tab-item>财经</tab-item>
      <tab-item>文化</tab-item>
      <tab-item>娱乐</tab-item>
      <tab-item>音乐</tab-item>
      <tab-item>生活</tab-item>
    </Tab>
    <scroll
      :pulldownCallback="handlePulldownLoading"
      :pullupCallback="handlePullupLoading"
      :showLoadIcon="showLoadIcon"
    >
      。。。。
      。。。。
    </scroll>
  </ViewBox>
</template>

<script>
  import {ViewBox, Search, Tab, TabItem, Scroller} from 'vux'
  import Scroll from 'components/scroll/scroll'
  import scrollMixin from './scrollMixin'
  import mock from './mock'

  export default {
    name: "find",
    components: {...{ViewBox, Search, Tab, TabItem, Scroller}, Scroll},
    data: () => ({
      searchValue: "",
      tabIndex: 0,
      showLoadIcon: true
    }),
    methods: {
      handleSearch(val) {
        console.log("search", val)
      },
    },
    mounted() {
      setTimeout(() => {
        this.showLoadIcon = false
      }, 1000)
    },
    mixins: [scrollMixin, mock]
  }
</script>

<style lang="scss" scoped>

</style>
