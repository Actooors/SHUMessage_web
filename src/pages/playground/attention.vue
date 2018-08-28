<template>
  <scroll
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <common-card
      v-for="item of cards"
      :key="item.value"
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.publishTime"
      :shareInfo="item.shareInfo"
    ></common-card>
  </scroll>
</template>

<script>
  import CommonCard from "components/commonCard/commonCard"
  import {attention as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'
  //暂未引入detail，因为关注和推荐中同时涉及动态和消息，先在recommend里面试水，完善了再将其引入attention
  export default {
    name: "attention",
    components: {CommonCard, Scroll},
    mixins: [mock, scrollMixin]
  }
</script>

<style scoped>

</style>
