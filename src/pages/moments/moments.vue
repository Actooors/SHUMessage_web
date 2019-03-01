<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <ViewBox
    body-padding-bottom="0px"
    ref="momentsViewBox"
    id="momentsViewBox"
  >
    <x-header slot="header" class="theme-XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              id="moments-XHeader"
    >动态
      <div slot="left" @click="$router.push('/addFriend')">
        <i class="icon-tianjiahaoyou iconfont icon"></i>
      </div>
      <div slot="right">
        <i class="icon-huida iconfont icon"></i>
      </div>
    </x-header>
    <scroll
      :noMore="noMore"
      :pulldownCallback="handlePulldownLoading"
      :pullupCallback="handlePullupLoading"
      bodyPaddingBottom="47px"
      :showLoadIcon="showLoadIcon"
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
          :msg="item"
          @onClickShareButton="handleClickShareButton(arguments,item)"
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
  import stickybits from 'stickybits'

  export default {
    name: "moments",
    components: {...{ViewBox, XHeader}, UserMessageCard, Scroll},
    data: () => ({
      avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=2",
      showLoadIcon: true,
      noMore: false
    }),
    mounted() {
      let viewBoxBody = this.$refs.momentsViewBox.getScrollBody()
      viewBoxBody.style.overflow = 'hidden'
      viewBoxBody.parentElement.style.overflow = 'hidden'
      this.loadData();

    },
    methods: {
      loadData() {
        setTimeout(() => {
          this.showLoadIcon = false;
          this.$nextTick(() => {
            stickybits('.justBar-box', {stickyBitStickyOffset: -1})
          })
        }, 500)
      },
      handlePublicMoments() {
        this.$router.push('/publish')
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
