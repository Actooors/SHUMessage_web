<template>
  <div class="pCard">
    <div class="cardTopBar" v-if="msg.topic">
      <span class="topic" @click="handleClickTopic">{{msg.topic.name}}</span>
      <span class="operation"><span class="extraInfo">{{preHandleTime(msg.extraInfo)}}</span><x-icon
        type="ios-arrow-down"
        size="15"></x-icon></span>
    </div>
    <pre class="content">{{msg.content}}</pre>
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
      <div class="author" @click="pushProfile(msg.author.id)">
        <img v-if="lazyload" v-lazy="msg.author.avatar" class="avatar">
        <img v-else :src="msg.author.avatar" class="avatar">
        <span class="author-name">{{msg.author.name}}</span>
      </div>
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
      },
      lazyload: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleClickTopic(event){
        this.$emit('clickTopic');
        event.stopPropagation();
      },
      pushProfile(uid) {
        this.$router.push({path: '/profile', query: {id: uid}})
        event.stopPropagation()
      },
      handleClickShareButton() {
        this.$emit('onClickShareButton', ...arguments)
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
