<template>
  <scroll
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <playground-card
      v-for="item of cards"
      :key="item.value"
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.publishTime"
      :shareInfo="item.shareInfo"
    ></playground-card>
  </scroll>
</template>

<script>
  import PlaygroundCard from "components/playgroundCard/playgroundCard"
  import {attention as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: "attention",
    components: {PlaygroundCard, Scroll},
    mixins: [mock, scrollMixin]
  }
</script>

<style scoped>

</style>
