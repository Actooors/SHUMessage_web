<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="pCard">
    <div class="left-side avatar" v-lazy:background-image="msg.author.avatar" v-if="msg.lazyLoad"></div>
    <div class="left-side avatar" :style="`background-image:url(${msg.author.avatar})`" v-else></div>
    <div class="right-side">
      <div class="cardTopBar">
        <div class="cardTopBar-top">
          <span class="author">{{msg.author.name}}</span>
          <span v-if="msg.band" class="band"> {{msg.band}} </span>
          <span v-if="msg.extraUser">{{msg.extraUser.name}}</span>
          <span class="operation" v-if="!msg.hideExtra"><span class="star" v-if="msg.showStar">关注</span><x-icon
            type="ios-arrow-down"
            size="15"></x-icon></span>
        </div>
        <div class="cardTopBar-extra">
          <span class="hasbeenfrom">{{relativeTime(msg.publishTime)}}</span>
          <span class="position" v-if="msg.position">
            <i class="icon-location1 iconfont icon"></i>{{msg.position.name}} · {{msg.position.distance}}
          </span>
        </div>
      </div>
      <div class="content" v-html="msg.content"></div>
      <div
        v-if="msg.topic"
        class="topic-box"
      >
        <span class="topic">{{msg.topic.name}}</span>
      </div>
      <share-bar
        v-if="msg.shareInfo"
        :like="msg.shareInfo.like"
        :comment="msg.shareInfo.comment"
        :share="msg.shareInfo.share"
        :footprint="msg.footprint"
        class="shareBar"
        @onClickShareButton="handleClickShareButton"
      ></share-bar>
    </div>
  </div>
</template>

<script>
  import ShareBar from 'components/shareBar/shareBar'
  import relativeTime from 'assets/js/relativeTime'

  export default {
    name: "userMessageCard",
    components: {ShareBar},
    props: {
      msg: {
        type: Object,
        require: true,
      }
    },
    methods: {
      relativeTime(t) {
        return relativeTime(t)
      },
      handleClickShareButton(index){
        this.$emit('onClickShareButton',index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "userMessageCard";
</style>
