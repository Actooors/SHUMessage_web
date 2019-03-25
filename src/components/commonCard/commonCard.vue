<template>
  <div class="pCard">
    <div class="cardTopBar">
      <span class="topic" v-if="msg.labels.length">{{msg.labels[0].name}}</span>
      <span class="operation"><span class="extraInfo">{{"官方新闻" | preHandleTime}}</span><x-icon
        type="ios-arrow-down"
        size="15"></x-icon></span>
    </div>
    <pre class="content">{{msg.description || msg.content}}</pre>
    <div
      v-if="msg.media_type==='URL'"
      class="url"
      @click="handleClickUrl(msg.media_url)"
    >
      <img src="../../assets/images/web.jpg" class="url-img"/>
      <div class="url-side">
        <p class="url-title">{{msg.media_title}}</p>
        <p class="url-domain">{{getDomain(msg.media_url)}}</p>
      </div>

    </div>
    <div class="author">
      <div class="author" @click="pushProfile(msg.publisher.id)">
        <img v-if="lazyload" v-lazy="msg.publisher.avatar" class="avatar">
        <img v-else :src="msg.publisher.avatar" class="avatar">
        <span class="author-name">{{msg.publisher.nickname}}</span>
      </div>
      <span class="author-append" v-if="msg.publish_time">{{msg.publish_time | preHandleTime}}</span>
    </div>
    <share-bar
      :like="msg.liked_num"
      @onClickShareButton="handleClickShareButton"
      :comment="msg.comment_num"
      :share="msg.shared_num"
      :liked="msg.like.length > 0 && msg.like[0].liked"
      :commented="msg.discuss.length > 0"
      :forwarded="msg.share.length > 0"
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
    filters: {
      preHandleTime(ex) {
        return preHandleTime(ex)
      }
    },
    methods: {
      pushProfile(uid) {
        this.$router.push({path: '/profile', query: {uid}})
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "commonCard";
</style>
