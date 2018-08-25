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
      :extraInfo="item.extraInfo"
      :shareInfo="item.shareInfo"
    ></playground-card>
  </scroll>
</template>

<script>
  import PlaygroundCard from "components/playgroundCard/playgroundCard"
  import {recommend as mock} from './mock'
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: "recommend",
    components: {PlaygroundCard, Scroll},
    mixins: [mock, scrollMixin],
    // watch: {
    //   '$route'(to) {
    //     if (to.meta.tabIndex === 1) {
    //       console.log("欢迎", to)
    //     }
    //   }
    // }
  }
</script>

<style scoped>

</style>
