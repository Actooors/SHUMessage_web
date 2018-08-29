<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="pCard">
    <div class="left-side avatar" v-lazy:background-image="author.avatar" v-if="lazyLoad"></div>
    <div class="left-side avatar" :style="`background-image:url(${author.avatar})`" v-else></div>
    <div class="right-side">
      <div class="cardTopBar">
        <div class="cardTopBar-top">
          <span class="author">{{author.name}}</span>
          <span v-if="band" class="band"> {{band}} </span>
          <span v-if="extraUser">{{extraUser.name}}</span>
          <span class="operation" v-if="!hideExtra"><span class="star" v-if="showStar">关注</span><x-icon
            type="ios-arrow-down"
            size="15"></x-icon></span>
        </div>
        <div class="cardTopBar-extra">
          <span class="hasbeenfrom">{{relativeTime(publishTime)}}</span>
          <span class="position" v-if="position">
            <i class="icon-location1 iconfont icon"></i>{{position.name}} · {{position.distance}}
          </span>
        </div>
      </div>
      <div class="content" v-html="content"></div>
      <div
        v-if="topic"
        class="topic-box"
      >
        <span class="topic">{{topic.name}}</span>
      </div>
      <share-bar
        v-if="shareInfo"
        :like="shareInfo.like"
        :comment="shareInfo.comment"
        :share="shareInfo.share"
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
      showStar: {
        type: Boolean,
        require: true
      },
      shareInfo: {
        type: Object,
        require: true
      },
      publishTime: {
        type: String,
        default() {
          return Date.now().toString()
        }
      },
      position: {
        type: Object
      },
      hideExtra: {
        type: Boolean,
        default: false
      },
      band: {
        type: String
      },
      extraUser: {
        type: Object
      },
      lazyLoad: {
        type: Boolean,
        default: true
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
