<template>
  <ViewBox ref="viewbox" class="profile-viewbox" id="__viewBox">
    <x-header slot="header"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
              id="profile-XHeader"
    >
      <div slot="left">
        <i class="icon-back iconfont icon"></i>
      </div>
      <div slot="right">
        <i class="icon-more iconfont icon"></i>
      </div>
    </x-header>
    <div class="content">
      <div class="gallery">
        <div class="row toprow">
          <img src="/static/testAvatar.JPG" class="avatar">
          <div class="row">
            <button class="chat">
              <i class="icon-message-fill iconfont icon"></i>
            </button>
            <button class="follow">
              <span><i class="icon-plus iconfont icon"></i>关注</span>
            </button>
          </div>
        </div>
        <h1 class="username">--正--</h1>
        <p class="signature">还没有签名</p>
        <div class="row">
          <span class="tag" v-for="tag of tags">{{tag.name}}</span>
        </div>
        <p class="tip">她也关注了主题“校园新动向”</p>
        <div class="gallery-bottom">
          <div>
            <p class="num">0</p>
            <p>创建的主题</p>
          </div>
          <div>
            <p class="num">447</p>
            <p>关注的主题</p>
          </div>
          <div>
            <p class="num">97</p>
            <p>她关注的人</p>
          </div>
          <div>
            <p class="num">48</p>
            <p>关注她的人</p>
          </div>
        </div>
      </div>
      <div class="main-list">
        <div class="list-top">
          <Tab :line-width="2" custom-bar-width="25px" bar-active-color="#2196F3" active-color="#2196F3" class="tab">
            <tab-item selected>动态</tab-item>
            <tab-item>档案</tab-item>
          </Tab>
        </div>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
        <p>hh</p>
      </div>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Tab, TabItem} from 'vux'
  import mockMixin from './mock'
  import stickybits from 'stickybits'

  export default {
    name: "profile",
    components: {ViewBox, XHeader, Tab, TabItem},
    mounted() {
      this.resetViewBoxPropertities()
      this.$nextTick(() => {
        stickybits(".list-top", {stickyBitStickyOffset: 46})
      })
      this.$refs.viewbox.getScrollBody().addEventListener('scroll', this.handleScroll)
    },
    methods: {
      resetViewBoxPropertities() {
        let e = this.$refs.viewbox.getScrollBody()
        e.style.position = "absolute";
        e.style.left = "0";
        e.style.top = "0";
        e.style.width = "100%";
      },
      handleScroll(event) {
        let top = event.target.scrollTop
        document.getElementById('profile-XHeader').style.backgroundPositionY = `${-Math.min(top, 300 - 46)}px`
      }
    },
    mixins: [mockMixin]
  }
</script>

<style lang="scss" scoped>
  @import "./profile";
</style>

<style lang="scss">
  @import "../../assets/css/varies";

  #profile-XHeader {
    background: url("https://s2.music.126.net/style/web2/img/down/bg.jpg?555a00dc3f44ed524eb92d70bbd60bc0");
    background-position-x: 0;
    z-index: 1;
    padding: 3px 0 13px;
    border: none;
    .vux-header-left, .vux-header-title, .vux-header-right, .vux-header-back {
      color: $--theme-gray-light25 !important;
    }
    .vux-header-more {
      color: $--theme-gray-light25 !important;
    }
    .vux-header-title {
      margin: 0 52px !important;
    }
  }
</style>
