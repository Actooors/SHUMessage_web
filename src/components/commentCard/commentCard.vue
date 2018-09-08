<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="pCard" @click="handleClickCard">
    <div class="left-side avatar" v-lazy:background-image="author.avatar"></div>
    <div class="right-side">
      <div class="cardTopBar">
        <div class="cardTopBar-top">
          <span class="author">{{author.name}}</span>
          <span class="operation" @click="handleClickLike">{{shareInfo.like?shareInfo.like:''}}
            <i :class="`icon-appreciate iconfont icon${footprint.like?' icon-done':''}`"></i>
          </span>
        </div>
        <div class="cardTopBar-extra">
          <span class="hasbeenfrom">{{relativeTime(publishTime)}}</span>
        </div>
      </div>
      <div class="content" v-text="content"></div>
      <div
        v-if="showComment && replies.count"
        class="commentBox"
        @click="handleClickReplay"
      >
        <div
          v-for="item of replies.representatives"
          :key="item.value"
          class="comment"
        >
          <span class="authorName">
            {{item.author.name}}
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
      imgs: {
        type: Array,
        default() {
          return []
        }
      },
      shareInfo: {
        type: Object,
        default() {
          return {
            like: 0
          }
        }
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
      },
      footprint: {
        type: Object,
        default() {
          return {
            like: false
          }
        }
      }
    },
    data: () => ({
    }),
    methods: {
      relativeTime(t) {
        return relativeTime(t)
      },
      handleClickReplay() {
        this.$emit('onClickReply')
      },
      handleClickLike(event) {
        this.$emit('onClickLike')
        event.stopPropagation()
      },
      handleClickCard(event) {
        this.$emit('onClickCard',event.clientX, event.clientY)
        event.stopPropagation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "commentCard";
</style>
