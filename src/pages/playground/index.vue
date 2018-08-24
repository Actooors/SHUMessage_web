<template>
  <ViewBox>
    <Search
      placeholder="志愿活动"
      @on-submit="handleSearch"
      auto-scroll-to-top
      ref="search"
      v-model="searchValue"
      cancel-text="返回"
    >
      <search-result :value="searchValue"></search-result>
    </Search>
    <tab
      :line-width="2"
      custom-bar-width="20px"
      bar-active-color="#2196F3"
      active-color="#2196F3"
      v-model="tabIndex"
    >
      <tab-item @on-item-click="handleClickTabItem('/playground/attention')">关注</tab-item>
      <tab-item @on-item-click="handleClickTabItem('/playground/recommend')">推荐</tab-item>
      <tab-item @on-item-click="handleClickTabItem('/playground/neighborhood')">附近</tab-item>
    </tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </ViewBox>
</template>

<script>
  import {ViewBox, Tab, TabItem, Search} from 'vux'
  import SearchResult from 'components/searchResult/searchResult'

  export default {
    name: "playground",
    components: {...{ViewBox, Tab, TabItem, Search}, SearchResult},
    data: () => ({
      searchValue: "",
      tabIndex: 1
    }),
    created() {
      this.initTab()
    },
    methods: {
      handleClickTabItem(pushExpression) {
        this.$router.push(pushExpression)
      },
      handleSearch(value) {
        console.log("asd", value)
        this.$refs.search.setBlur()
      },
      initTab() {
        // 从后向前遍历，有tabIndex的就更新
        let len = this.$route.matched.length
        let tabIndex = -1;
        for (let i = len - 1; i >= 0; i--) {
          Number.isInteger(this.$route.matched[i].meta.tabIndex) && (tabIndex = this.$route.matched[i].meta.tabIndex)
        }
        if (tabIndex > -1 && this.tabIndex !== tabIndex) {
          this.tabIndex = tabIndex
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
