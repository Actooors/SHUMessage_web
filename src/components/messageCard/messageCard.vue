<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="pCard" ref="pCard">
    <div class="row top-row">
      <div @click="pushProfile(msg.author.id)">
        <div class="left-side avatar" v-lazy:background-image="msg.author.avatar" v-if="lazyload"></div>
        <div class="left-side avatar" :style="`background-image:url(${msg.author.avatar})`" v-else></div>
      </div>
      <div class="right-side">
        <div class="cardTopBar">
          <div class="cardTopBar-top">
            <span class="author" @click="pushProfile(msg.author.id)">{{msg.author.name}}</span>
            <span v-if="msg.band" class="band"> {{msg.band}} </span>
            <span v-if="msg.extraUser" @click="pushProfile(msg.extraUser.id)">{{msg.extraUser.name}}</span>
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
      </div>
    </div>
    <div style="display: flex;align-items: center" class="row">
      <img src="../../assets/images/like.png" class="inline-icon" v-if="msg.isLike">
      <span>{{msg.content}}</span>
    </div>
    <div class="row">
      <div
        v-if="msg.media"
        class="url"
        @click="handleClickMedia(msg.info)"
      >
        <img v-lazy:background-image="msg.media.img" class="url-img" v-if="msg.media.img"/>
        <div class="url-side">
          <p class="url-title"><span class="clickable" @click="handleClickAuthor(msg.media.author.id)">{{msg.media.author.name}}</span>:
            {{msg.media.title}}</p>
        </div>
      </div>
    </div>
    <div class="row replyBar" v-if="!msg.band">
      <p class="replyBar" @click="$emit('onClickReply')">回复{{msg.author.name}}:</p>
    </div>
  </div>
</template>

<script>
  import ShareBar from 'components/shareBar/shareBar'
  import relativeTime from 'assets/js/relativeTime'

  export default {
    name: "messageCard",
    components: {ShareBar},
    props: {
      msg: {
        type: Object,
        require: true,
      },
      lazyload: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      rightSideWidth: 0
    }),
    mounted() {
      // this.$nextTick(() => {
      //   this.initRightSideWidth()
      // })
      // window.addEventListener('resize', this.initRightSideWidth)
    },
    methods: {
      handleClickAuthor(uid) {
        event.stopPropagation();
        this.$router.push({path: '/profile', query: {id: uid}});
      },
      pushProfile(uid) {
        this.$router.push({path: '/profile', query: {id: uid}});
        event.stopPropagation()
      },
      handleClickMedia(info) {
        this.$router.push({path: '/detail/msg', query: info});
        event.stopPropagation()
      },
      handleClickImg(event, srcArray, index) {
        this.$emit('onClickImg', Array.from(event.target.parentElement.parentElement.childNodes), srcArray, index)
        event.stopPropagation()
      },
      initRightSideWidth() {
        // console.log(window.getComputedStyle(document.querySelector('.neighborhood-card'))['width'])
        let p = this.$refs.pCard

        let s = getComputedStyle(p)
        this.rightSideWidth = Number.parseInt(s['width']) - document.querySelector('.left-side').clientWidth
      },
      relativeTime(t) {
        return relativeTime(t)
      },
      handleClickShareButton() {
        this.$emit('onClickShareButton', ...arguments)
      },
      getDomain(url) {
        let s = url.replace(/.+:\/\//, '')
        let l = s.indexOf('/')
        return s.substring(0, l > 0 ? l : s.length)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "messageCard";
</style>
