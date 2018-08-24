<template>
  <div>
    <playground-card
      v-for="item of cards"
      :key="item.value"
      :topic="item.topic"
      :content="item.content"
      :author="item.author"
      :extraInfo="item.extraInfo"
      :shareInfo="item.shareInfo"
    ></playground-card>
  </div>
</template>

<script>
  import PlaygroundCard from "components/playgroundCard/playgroundCard"
  import {recommend as mock} from './mock'

  export default {
    name: "recommend",
    components: {PlaygroundCard},
    mixins: [mock]
  }
</script>

<style scoped>

</style>
