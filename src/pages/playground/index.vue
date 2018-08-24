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
        <tab-item @on-item-click="handleClickTabItem('/playground/attention')">关注</tab-item>
        <tab-item @on-item-click="handleClickTabItem('/playground/recommend')">推荐</tab-item>
        <tab-item @on-item-click="handleClickTabItem('/playground/neighborhood')">附近</tab-item>
      </tab>
    </div>
    <scroller lock-x
              scrollbar-y
              use-pulldown
              use-pullup
              @on-pulldown-loading="handlePulldown"
              @on-pullup-loading="handlePullup"
              v-model="scrollerStatus"
              :height="scrollHeight"
              ref="scroller"
              @on-scroll="handleScroll"
    >
      <keep-alive>
        <router-view id="view"></router-view>
      </keep-alive>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
        <span v-show="scrollerStatus.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow"
              v-show="scrollerStatus.pulldownStatus === 'down' || scrollerStatus.pulldownStatus === 'up'"
              :class="{'rotate': scrollerStatus.pulldownStatus === 'up'}">↓</span>
        <span v-show="scrollerStatus.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 20px; bottom: -20px; text-align: center;">
        <span v-show="scrollerStatus.pullupStatus === 'default'"></span>
        <span class="pullup-arrow"
              v-show="scrollerStatus.pullupStatus === 'down' || scrollerStatus.pullupStatus === 'up'"
              :class="{'rotate': scrollerStatus.pullupStatus === 'up'}">↑</span>
        <span v-show="scrollerStatus.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </ViewBox>
</template>

<script>
  import {ViewBox, Tab, TabItem, Search, Scroller, Spinner} from 'vux'
  import SearchResult from 'components/searchResult/searchResult'
  import stickybits from 'stickybits'

  export default {
    name: "playground",
    components: {...{ViewBox, Tab, TabItem, Search, Scroller, Spinner}, SearchResult},
    data: () => ({
      searchValue: "",
      tabIndex: 1,
      timer: null,
      scrollTop: -1,
      offset: 0,
      scrollerStatus: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      viewHeight: "",
      searchHeight: 0,
      nodeTopBar: null,
      nodeTabBar: null,
      nodeTab: null,
      scrollHeight: "0"
    }),
    created() {
      this.initTab()
    },
    mounted() {
      stickybits('.topBar');
      this.initHeaderScroll();
    },
    methods: {
      initScroller() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          let topBarHeight = Number(window.getComputedStyle(this.nodeTopBar)["height"].replace(/px/, ''))
          let tabbarHeight = Number(window.getComputedStyle(this.nodeTabbar)["height"].replace(/px/, ''))
          this.scrollHeight = `-${topBarHeight + tabbarHeight - 10}px`
          console.log(topBarHeight, tabbarHeight, this.scrollHeight)
        }, 100)
      },
      handlePulldown() {
        console.log("拉下来了", this.$refs.scroller)
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
      },
      handlePullup() {
        console.log("拉上来了", this.$refs.scroller)
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
      },
      initHeaderScroll() {
        let search = document.querySelector('#search')
        search.style.position = "relative"
        this.searchHeight = search.offsetHeight
        this.nodeTab = document.querySelector('#tab')
        this.nodeTopBar = document.querySelector("#topBar")
        this.nodeTabbar = document.querySelector('#tabbar')
        this.initScroller()
      },
      handleScroll({top}) {
        let st = top
        let oh = this.searchHeight
        let ok = false
        let tab = this.nodeTab
        //如果this.scrollTop已经开始记录了
        if (this.scrollTop > -1) {
          let dist = st - this.scrollTop
          //触顶了！！
          if (st <= 0) {
            this.offset = 0
            ok = true
            //如果向下滚动的距离比较大，或者已经开始拉搜索框了，则拉出搜索框
          } else if ((-dist >= 15 || this.offset < oh) && this.offset > 0) {
            this.offset += dist
            ok = true
            //向上滚动，则推入搜索框
          } else if (dist > 0 && this.offset < oh) {
            this.offset += dist
            ok = true
          }
          if (ok) {
            if (this.offset > oh) {
              this.offset = oh
            } else if (this.offset < 0) {
              this.offset = 0
            }
            tab.style.top = `${-this.offset}px`
            tab.style.paddingTop = `${oh - this.offset}px`
            search.style.top = tab.style.top
          }
        }
        this.scrollTop = st;
        //也要记得动态调整scroller的height
        this.$nextTick(() => {
          this.initScroller()
        })
      },
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
  @import "index";
</style>
