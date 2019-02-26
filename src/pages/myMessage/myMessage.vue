<template>
  <ViewBox
    v-show="!selectGroup"
    class="momentPublish-wrapper"
    body-padding-bottom="46px"
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
          v-for="item of block.cards"
          :key="item.value"
          :msg="item"
          @onClickShareButton="handleClickShareButton(...arguments,item)"
        ></message-card>
      </div>
    </div>
  </ViewBox>

</template>

<script>
  import {ViewBox, XHeader} from 'vux'
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import autosize from 'autosize'
  import mockMixin from "./mock";
  import stickybits from 'stickybits'
  import MessageCard from "components/messageCard/messageCard";

  export default {
    name: "myMessage",
    components: {MessageCard, ...{ViewBox, XHeader}, UserMessageCard},
    mixins: [mockMixin],
    data: () => ({
      selectGroup: false
    }),
    mounted() {
      autosize(this.$refs.textarea, {initOffset: 0});
      stickybits('.vux-header')
    },
    methods: {
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

  .message-card {
    border-bottom: $--theme-gray-light3 solid 1px;
  }
</style>
