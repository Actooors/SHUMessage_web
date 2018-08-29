<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <ViewBox ref="momentsViewBox" id="momentsViewBox">
    <x-header slot="header" class="theme-XHeader"
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
      @on-scroll="handleScroll"
      ref="scroll"
    >
      <div class="publishMoments" @click="handlePublicMoments">
        <div v-lazy:background-image="avatar" class="avatar"></div>
        <span>发布动态...</span>
      </div>
      <div
        v-for="block of raw"
        :key="block.value"
        class="block"
      >
        <div class="justBar-box">
          <p class="justBar">
            <span class="justBar-title">{{block.blockName}}</span>
            <x-icon
              type="ios-arrow-down"
              size="15"
              class="justBar-operation"
            ></x-icon>
          </p>
        </div>
        <user-message-card
          class="moments-card"
          v-for="item of block.cards"
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
          :showStar="item.showStar"
          @onClickShareButton="handleClickShareButton(arguments,item.info)"
        ></user-message-card>
        <div class="block-append">
          <router-link
            v-if="block.blockAppend && block.blockAppend.type==='buttonLink'"
            :to="block.blockAppend.link"
            class="buttonLink"
          >{{block.blockAppend.title}}
          </router-link>
        </div>
      </div>
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
    mounted() {
      let viewBoxBody = this.$refs.momentsViewBox.getScrollBody()
      viewBoxBody.style.overflow = 'hidden'
      viewBoxBody.parentElement.style.overflow = 'hidden'
    },
    methods: {
      handlePublicMoments() {
        console.log("发表新动态")
      },
      handleClickShareButton([index], info) {
        console.log("moments - handleClickShareButton", index, info)
      }
    },
    mixins: [mock, scrollMixin]
  }
</script>

<style lang="scss" scoped>
  @import "moments";
</style>
