<template>
  <scroll
    @on-scroll="handleScroll"
    :height="scrollHeight"
    @on-pulldown-loading="handlePulldownLoading"
    @on-pullup-loading="handlePullupLoading"
    ref="scroll"
  >
    <user-message-card
      v-for="item of cards"
      :key="item.value"
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :shareInfo="item.shareInfo"
      :publishTime="item.publishTime"
      :position="item.position"
    ></user-message-card>
  </scroll>
</template>

<script>
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import {neighborhood as mock} from "./mock"
  import scrollMixin from './scrollMixin'
  import Scroll from 'components/scroll/scroll'

  export default {
    name: "neighborhood",
    components: {UserMessageCard, Scroll},
    mixins: [mock, scrollMixin]
  }
</script>

<style scoped>

</style>
