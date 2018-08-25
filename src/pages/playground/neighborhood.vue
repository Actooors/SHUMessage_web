<template>
  <div>
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
  </div>
</template>

<script>
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import {neighborhood as mock} from "./mock";

  export default {
    name: "neighborhood",
    components: {UserMessageCard},
    mixins: [mock]
  }
</script>

<style scoped>

</style>
