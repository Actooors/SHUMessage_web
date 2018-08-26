<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <ViewBox>
    <x-header slot="header" class="moments-XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              id="moments-XHeader"
    >动态
      <div slot="left">
        <i class="icon-tianjiahaoyou iconfont icon"></i>
      </div>
      <div slot="right">
        <i class="icon-huida iconfont icon"></i>
      </div>
    </x-header>
    <scroll
      :height="scrollHeight"
      @on-pulldown-loading="handlePulldownLoading"
      @on-pullup-loading="handlePullupLoading"
      ref="scroll"
    >
      <div class="publishMoments" @click="handlePublicMoments">
        <div v-lazy:background-image="avatar" class="avatar"></div>
        <span>发布动态...</span>
      </div>
      <user-message-card
        v-for="item of cards"
        :key="item.value"
        :topic="item.topic"
        :content="item.content"
        :author="item.author"
        :shareInfo="item.shareInfo"
        :publishTime="item.publishTime"
        :position="item.position"
        :hideExtra="item.hideExtra"
        :band="item.band"
        :extraUser="item.extraUser"
        :starred="item.starred"
      ></user-message-card>
      <div class="recommend">
        校友都在看
        <x-icon
          type="ios-arrow-down"
          size="15"
          class="recommend-operation"
        ></x-icon>
      </div>
      <user-message-card
        v-for="item of cards2"
        :key="item.value"
        :topic="item.topic"
        :content="item.content"
        :author="item.author"
        :shareInfo="item.shareInfo"
        :publishTime="item.publishTime"
        :position="item.position"
        :hideExtra="item.hideExtra"
        :band="item.band"
        :extraUser="item.extraUser"
        :starred="item.starred"
      ></user-message-card>
    </scroll>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import Scroll from 'components/scroll/scroll'
  import mock from './mock'
  import scrollMixin from './scrollMixin'

  export default {
    name: "moments",
    components: {...{ViewBox, XHeader}, UserMessageCard, Scroll},
    data: () => ({
      avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4",
    }),
    methods: {
      handlePublicMoments() {
        console.log("发表新动态")
      },
    },
    mixins: [mock, scrollMixin]
  }
</script>

<style lang="scss" scoped>
  @import "moments";
</style>
<style lang="scss">
  @import "../../assets/css/varies";

  .moments-XHeader {
    background-color: #fff !important;
    border-bottom: $--background-deep solid 1px;
    .vux-header-left, .vux-header-title, .vux-header-right {
      color: #000 !important;
    }
  }
</style>
