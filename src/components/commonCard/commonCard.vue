<template>
  <div class="pCard">
    <div class="cardTopBar" v-if="msg.topic">
      <span class="topic">{{msg.topic.name}}</span>
      <span class="operation"><span class="extraInfo">{{preHandleTime(msg.extraInfo)}}</span><x-icon
        type="ios-arrow-down"
        size="15"></x-icon></span>
    </div>
    <div class="content" v-text="msg.content"></div>
    <div
      v-if="msg.media && msg.media.type==='url'"
      class="url"
      @click="handleClickUrl(msg.media.value)"
    >
      <img src="../../assets/images/web.jpg" class="url-img"/>
      <div class="url-side">
        <p class="url-title">{{msg.media.title}}</p>
        <p class="url-domain">{{getDomain(msg.media.value)}}</p>
      </div>

    </div>
    <div class="author" v-if="msg.author">
      <img v-if="msg.lazyLoad" v-lazy="msg.author.avatar" class="avatar">
      <img v-else :src="msg.author.avatar" class="avatar">
      <span class="author-name">{{msg.author.name}}</span>
      <span class="author-append" v-if="msg.publishTime">{{preHandleTime(msg.publishTime)}}</span>
    </div>
    <share-bar
      v-if="msg.shareInfo"
      :like="msg.shareInfo.like"
      @onClickShareButton="handleClickShareButton"
      :comment="msg.shareInfo.comment"
      :share="msg.shareInfo.share"
      :footprint="msg.footprint"
      hr="hr"
      class="shareBar"
    ></share-bar>
  </div>
</template>

<script>
  import ShareBar from 'components/shareBar/shareBar'
  import {preHandleTime} from 'assets/js/relativeTime'

  export default {
    name: "commonCard",
    components: {ShareBar},
    props: {
      msg: {
        type: Object,
        require: true
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
        this.$router.push({path: '/seo', query: {url, title: this.msg.media.title}})
        event.stopPropagation()
      },
      preHandleTime(ex) {
        return preHandleTime(ex)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "commonCard";
</style>
