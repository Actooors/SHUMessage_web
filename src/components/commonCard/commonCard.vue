<template>
  <div class="pCard">
    <div class="cardTopBar">
      <span class="topic">{{topic.name}}</span>
      <span class="operation"><span class="extraInfo">{{extraInfo}}</span><x-icon type="ios-arrow-down"
                                                                                                size="15"></x-icon></span>
    </div>
    <div class="content" v-html="content"></div>
    <div
      v-if="media && media.type==='url'"
      class="url"
      @click="handleClickUrl(media.value)"
    >
      <img src="../../assets/images/web.jpg" class="url-img"/>
      <div class="url-side">
        <p class="url-title">{{media.title}}</p>
        <p class="url-domain">{{getDomain(media.value)}}</p>
      </div>

    </div>
    <div class="author">
      <img v-if="lazyLoad" v-lazy="author.avatar" class="avatar">
      <img v-else :src="author.avatar" class="avatar">
      <span class="author-name">{{author.name}}</span>
      <span class="author-append" v-if="publishTime">{{preHandleTime(publishTime)}}</span>
    </div>
    <share-bar
      :like="shareInfo.like"
      @onClickShareButton="handleClickShareButton"
      :comment="shareInfo.comment"
      :share="shareInfo.share"
      hr="hr"
      class="shareBar"
    ></share-bar>
  </div>
</template>

<script>
  import ShareBar from 'components/shareBar/shareBar'
  import dayjs from 'dayjs'

  export default {
    name: "commonCard",
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
      },
      lazyLoad: {
        type: Boolean,
        default: true
      },
      publishTime: {
        type: String
      },
      media: {
        type: Object,
        default: null
      }
    },
    methods: {
      handleClickShareButton(index) {
        this.$emit('onClickShareButton', index)
      },
      getDomain(url) {
        let s = url.replace(/.+:\/\//, '')
        let l = s.indexOf('/')
        return s.substring(0, l > 0 ? l : s.length)
      },
      handleClickUrl(url) {
        this.$router.push('自带iframe', {query: {url}})
      },
      preHandleTime(ex) {
        let t = dayjs(ex)
        if (!t.isValid()) {
          return ex
        }
        return t.format('YYYY.MM.DD hh:mm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "commonCard";
</style>
