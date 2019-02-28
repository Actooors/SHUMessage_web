<template>
  <Scroll
    class="myMessage-wrapper"
    :noMore="noMore"
    :pulldownCallback="handlePulldownCallback"
    :pullupCallback="handlePullupCallback"
    :showLoadIcon="showLoadIcon"
  >
    <x-header slot="header" class="theme-XHeader"
              :left-options="{showBack: true,backText:''}"
              :right-options="{showMore: false}"
    >消息
    </x-header>
    <div class="blocks">
      <div v-for="block of raw" :key="block.value" class="block">
        <message-card
          class="message-card"
          v-for="(item,index) of block.cards"
          :key="item.value"
          :msg="item"
          @onClickShareButton="handleClickShareButton(...arguments,item)"
          @onClickReply="handleClickReply(index)"
        ></message-card>
      </div>
    </div>
  </Scroll>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import Scroll from 'components/scroll/scroll'
  import autosize from 'autosize'
  import mockMixin from "./mock";
  import stickybits from 'stickybits'
  import MessageCard from "components/messageCard/messageCard";

  export default {
    name: "myMessage",
    components: {MessageCard, ...{ViewBox, XHeader}, Scroll},
    mixins: [mockMixin],
    data: () => ({
      showLoadIcon: false,
      noMore: false,
    }),
    mounted() {
      autosize(this.$refs.textarea, {initOffset: 0});
      stickybits('.vux-header')
    },
    methods: {
      handleClickReply(index) {
        console.log("点击了reply，应该弹出回复框", index)
      },
      handlePulldownCallback(callback) {
        setTimeout(() => {
          callback();
        }, 500)
      },
      handlePullupCallback(callback) {
        const that = this;
        setTimeout(() => {
          callback();
          that.noMore = true;
        }, 500)
      },
      handleCancelSelectGroup() {
        this.$nextTick(() => {
          this.selectGroup = false;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/varies";

  .myMessage-wrapper {
    background-color: $--background-deep2;
  }

  .message-card {
    box-shadow: $--theme-gray-light3 0 5px 20px;
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
</style>
