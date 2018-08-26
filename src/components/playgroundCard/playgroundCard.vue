<template>
  <div class="pCard">
    <div class="cardTopBar">
      <span class="topic">{{topic.name}}</span>
      <span class="operation"><span class="extraInfo">{{extraInfo}}</span><x-icon type="ios-arrow-down" size="15"></x-icon></span>
    </div>
    <div class="content" v-html="content"></div>
    <div class="author">
      <img v-lazy="author.avatar" class="avatar">
      <span class="author-name">{{author.name}}</span>
    </div>
    <share-bar
      :like="shareInfo.like"
      :comment="shareInfo.comment"
      :share="shareInfo.share"
      hr="hr"
      class="shareBar"
    ></share-bar>
  </div>
</template>

<script>
  import ShareBar from 'components/shareBar/shareBar'

  export default {
    name: "playgroundCard",
    components: {ShareBar},
    props: {
      topic: {
        type: Object,
        require: true,
        // default() {
        //   return {
        //     id: 10001,
        //     name: "喵星人的日常"
        //   }
        // }
      },
      content: {
        type: String,
        require: true
      },
      author: {
        type: Object,
        require: true,
        // default() {
        //   return {
        //     id: 10001,
        //     avatar: "https://avatars2.githubusercontent.com/u/30586220?s=460&v=4"
        //     name: "Message广场导游"
        //   }
        // }
      },
      extraInfo: {
        type: String,
        require: false
      },
      shareInfo: {
        type: Object,
        require: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "playgroundCard";
</style>
