<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="pCard" @click="handleClickCard">
    <div @click="pushProfile(msg.operator.id)">
      <div class="left-side avatar" v-if="lazyload" v-lazy:background-image="msg.operator.avatar"></div>
      <div class="left-side avatar" v-else :style="`background-image:url(${msg.operator.avatar})`"></div>
    </div>
    <div class="right-side">
      <div class="cardTopBar">
        <div class="cardTopBar-top">
          <span class="author" @click="pushProfile(msg.operator.id)">{{msg.operator.nickname}}</span>
          <span class="operation" @click="handleClickLike">{{msg.liked_num?msg.liked_num:''}}
            <i :class="`icon-appreciate iconfont icon${msg.footprint && msg.footprint.like?' icon-done':''}`"></i>
            <!--TODO: 暂时放个msg.footprint && ，等待后端 -->
          </span>
        </div>
        <div class="cardTopBar-extra">
          <span class="hasbeenfrom" :key="tick">{{msg.publishTime | relativeTime}}</span>
        </div>
      </div>
      <pre class="content">{{msg.content}}</pre>
      <div
        class="comment-imgs"
        v-if="msg.img_url"
      >
        <img
          v-lazy="msg.img_url"
          class="comment-img"
          @click="$event.stopPropagation()"
          :preview="`id${msg.id}type${msg.type}`"
        >
      </div>
      <div
        v-if="showComment && msg.replies.count"
        class="commentBox"
        @click="handleClickReplay"
      >
        <div
          v-for="item of msg.replies.representatives"
          :key="item.value"
          class="comment"
        >
          <span class="authorName">
            {{item.author.nickname}}
          </span>
          <span>{{item.content}}</span>
        </div>
        <span
          v-if="replies.count>2"
          class="comment-more"
        >共{{replies.count}}条回复 >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import relativeTime from 'assets/js/relativeTime'
  import store from 'store/store'

  export default {
    name: "commentCard",
    store,
    props: {
      msg: {
        type: Object,
        required: true
      },
      showComment: {
        type: Boolean,
        default: true
      },
      tick: {
        type: Number,
        default() {
          return Date.now()
        }
      },
      lazyload: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({}),
    filters: {
      relativeTime(t) {
        return relativeTime(t)
      }
    },
    methods: {
      pushProfile(uid) {
        this.$router.push({path: '/profile', query: {uid}})
        event.stopPropagation()
      },
      handleClickReplay() {
        this.$emit('onClickReply')
        event.stopPropagation()
      },
      handleClickLike(event) {
        this.$emit('onClickLike')
        event.stopPropagation()
      },
      handleClickCard(event) {
        this.$emit('onClickCard', event.clientX, event.clientY)
        event.stopPropagation()
      },
      // handleClickImg(event) {
      //   this.$emit('onClickImg', event.target)
      //   event.stopPropagation()
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import "commentCard";
</style>
