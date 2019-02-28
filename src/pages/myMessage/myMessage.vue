<template>
  <Scroll
    class="myMessage-wrapper"
    :noMore="noMore"
    :pulldownCallback="handlePulldownCallback"
    :pullupCallback="handlePullupCallback"
    :showLoadIcon="showLoadIcon"
    ref="scroll"
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
          @onClickReply="handleClickReply(index,item)"
        ></message-card>
      </div>
    </div>
    <reply-bar :placeholder="replyBarPlaceholder" v-show="showReply" ref="replyBar"
               class="replyBar" @onSubmit="handleSubmit"></reply-bar>
  </Scroll>
</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import Scroll from 'components/scroll/scroll'
  import autosize from 'autosize'
  import mockMixin from "./mock";
  import stickybits from 'stickybits'
  import MessageCard from "components/messageCard/messageCard";
  import ReplyBar from "components/replyBar/replyBar";


  export default {
    name: "myMessage",
    components: {MessageCard, ...{ViewBox, XHeader}, Scroll, ReplyBar},
    mixins: [mockMixin],
    data: () => ({
      showLoadIcon: false,
      noMore: false,
      showReply: false,
      replyBarPlaceholder: ''
    }),
    mounted() {
      autosize(this.$refs.textarea, {initOffset: 0});
      stickybits('.vux-header');
      this.$refs.scroll.getScrollBody().addEventListener('click', () => {
        this.showReply = false
      });
      this.$refs.replyBar.$el.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    },
    beforeDestroy() {
      this.$refs.scroll.getScrollBody().removeEventListener('click', () => {
        this.showReply = false
      });
      this.$refs.replyBar.$el.removeEventListener('click', (event) => {
        event.stopPropagation();
      });
    },
    methods: {
      handleSubmit(){
        this.showReply = false;
      },
      handleClickReply(index, item) {
        event.stopPropagation();
        this.showReply = true;
        this.replyBarPlaceholder = `回复${item.author.name}:`;
        this.$nextTick(() => {
          this.$refs.replyBar.setFocus();
        })
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

  .replyBar {
    left: 0;
  }
</style>
