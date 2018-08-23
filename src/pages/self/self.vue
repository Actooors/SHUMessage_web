<template>
  <ViewBox class="wrapper">
    <x-header slot="header" class="XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: true}"
              @on-click-more="handleClickMore">SHU Message
    </x-header>
    <div class="show-bar">
      <div class="center-content">
        <XImg :src="avatar" class="avatar"></XImg>
        <p class="username">{{username}}</p>
        <p class="tips">{{tips}}</p>
      </div>
    </div>
    <tab :line-width="2" custom-bar-width="20px" bar-active-color="#2196F3" active-color="#2196F3" class="tab">
      <tab-item selected>瞬间</tab-item>
      <tab-item>收藏</tab-item>
    </tab>
    <div>
      <Timeline class="timeline">
        <timeline-item>
          <h4 class="recent">发布了一个动态</h4>
          <p class="recent">2016-04-17 12:00:00</p>
        </timeline-item>
        <timeline-item>
          <h4>订阅3个兴趣</h4>
          <p>2016-04-16 10:23:00</p>
        </timeline-item>
        <timeline-item>
          <h4>TA出生了！</h4>
          <p>2016-04-15 9:00:00</p>
        </timeline-item>
      </Timeline>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, Tab, TabItem, XImg, Timeline, TimelineItem, XHeader} from "vux";

  export default {
    name: "self",
    components: {Timeline, ViewBox, Tab, TabItem, XImg, TimelineItem, XHeader},
    data() {
      return {
        avatar: require('assets/images/avatar.png'),
        username: "喵的之章！",
        tips: "29天, 3个订阅",
      }
    },
    methods: {
      handleClickMore() {
        console.log("Click more")
        this.$router.push("/self/more")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "self";
</style>
