<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="pCard">
    <div class="left-side avatar" v-lazy:background-image="author.avatar"></div>
    <div class="right-side">
      <div class="cardTopBar">
        <div class="cardTopBar-top">
          <span class="author">{{author.name}}</span>
          <span class="operation">{{like?like:''}}<i
            class="icon-appreciate iconfont icon"></i></span>
        </div>
        <div class="cardTopBar-extra">
          <span class="hasbeenfrom">{{relativeTime(publishTime)}}</span>
        </div>
      </div>
      <div class="content" v-html="content"></div>
      <div
        v-if="showComment"
        class="commentBox"
        @click="handleClickReplay"
      >
        <div
          v-for="item of replies.representatives"
          :key="item.value"
          class="comment"
        >
          <span :to="`#${item.author.id}`" class="authorName">
            {{item.author.name}}
          </span>
          <span>{{item.content}}</span>
        </div>
        <router-link
          v-if="replies.count>2"
          :to="`#${info.id}&${info.type}`"
          class="comment-more"
        >共{{replies.count}}条回复 >
        </router-link>
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
      publishTime: {
        type: String,
        default() {
          return Date.now().toString()
        }
      },
      photos: {
        type: Array,
        default: []
      },
      like: {
        type: Number,
        default: 0
      },
      replies: {
        type: Object,
        default() {
          return {
            count: 0,
            representatives: []
          }
        }
      },
      info: {
        type: Object,
        default() {
          return {
            id: 0,
            type: 0
          }
        }
      },
      showComment: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      relativeTime(t) {
        return relativeTime(t)
      },
      handleClickReplay() {
        this.$emit('onClickReply')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "commentCard";
</style>
