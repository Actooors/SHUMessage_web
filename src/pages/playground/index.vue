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
    <tab :line-width="2" custom-bar-width="20px" bar-active-color="#2196F3" active-color="#2196F3">
      <tab-item @on-item-click="handleClickTabItem('/playground/attention')">关注</tab-item>
      <tab-item @on-item-click="handleClickTabItem('/playground/recommend')" selected>推荐</tab-item>
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
      searchValue: ""
    }),
    methods: {
      handleClickTabItem(pushExpression) {
        this.$router.push(pushExpression)
      },
      handleSearch(value) {
        console.log("asd", value)
        this.$refs.search.setBlur()

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
