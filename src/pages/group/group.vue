<template>
  <ViewBox ref="viewbox" class="profile-viewbox needsscroll" body-padding-bottom="0">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
      :right-options="{showMore: false}"
      id="profile-XHeader"
    >
      <div slot="left" @click="$router.back()">
        <i class="icon-back iconfont icon"></i>
      </div>
      <div slot="right">
        <i class="icon-more iconfont icon"></i>
      </div>
      <!--header部分-->
      <div id="profile-XHeader-back"></div>
      <transition name="fade" mode="out-in">
        <div class="headerInfo stroke" v-show="showHeaderInfo">
          <div class="row">
            <img :src="groupInfo.avatar" class="avatar">
            <div>
              <p>{{groupInfo.username}}</p>
              <p>共{{groupInfo.starNum}}人加入</p>
            </div>
          </div>
          <button class="follow" v-if="!isOwner">加入</button>
        </div>
      </transition>
    </x-header>
    <!--gallery等部分-->
    <div class="content">
      <div class="gallery">
        <div class="toprow stroke">
          <div class="avatarInfo">
            <img :src="groupInfo.avatar" class="avatar" preview="0" ref="avatar">
          </div>
          <div class="modifyAvatar" v-if="isOwner" @click="handleClickAvatar">
            <div @click="modifyAvatar">修改</div>
          </div>
          <div class="groupInfo" v-if="!isOwner">
            <h1 class="username stroke">{{groupInfo.username}}</h1>
            <p class="signature stroke">{{groupInfo.signature}}</p>
          </div>
        </div>
        <div class="row">
          <button class="follow">
              <span>
                <i class="icon-plus iconfont icon"></i>加入
              </span>
          </button>
        </div>
      </div>

      <!--下方白色tab和卡片部分-->
      <div class="main-list">
        <div class="list-top-box">
          <div class="list-top">
            <Tab
              :line-width="2"
              v-model="tabIndex"
              custom-bar-width="25px"
              bar-active-color="#2196F3"
              active-color="#2196F3"
              class="tab"
            >
              <tab-item selected>消息</tab-item>
              <tab-item>热门</tab-item>
            </Tab>
          </div>
        </div>
        <div class="swiper">
          <div class="moments-row" style="background: #f7f7f7;">
              <span class="row">
                <i class="icon-team iconfont icon"
                   style="font-size:17px;margin-right:3px;position: relative;top:-1px"></i>{{groupInfo.starNum}} 个成员
              </span>
            <span class="row" v-show="tabIndex===0">
                <i class="icon-huida iconfont icon" style="font-size:14px;margin-right:5px"></i>{{groupInfo.likeSum}} 条消息
              </span>
          </div>
          <div v-show="tabIndex===0">
            <div class="blocks">
              <div v-for="block of raw" :key="block.value" class="block">
                <user-message-card
                  class="block-card"
                  v-for="item of block.cards"
                  :key="item.value"
                  :msg="item"
                  @onClickShareButton="handleClickShareButton(...arguments,item)"
                ></user-message-card>
                <div class="block-append">
                  <router-link
                    v-if="block.blockAppend && block.blockAppend.type==='buttonLink'"
                    :to="block.blockAppend.link"
                    class="buttonLink"
                  >{{block.blockAppend.title}}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="archives" v-show="tabIndex===1">
            <div class="blocks">
              <div v-for="block of raw" :key="block.value" class="block">
                <user-message-card
                  class="block-card"
                  v-for="item of block.cards"
                  :key="item.value"
                  :msg="item"
                  @onClickShareButton="handleClickShareButton(...arguments,item)"
                ></user-message-card>
                <div class="block-append">
                  <router-link
                    v-if="block.blockAppend && block.blockAppend.type==='buttonLink'"
                    :to="block.blockAppend.link"
                    class="buttonLink"
                  >{{block.blockAppend.title}}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Tab, TabItem, Group, CellFormPreview} from "vux";
  import "animate.css";
  import UserMessageCard from "components/userMessageCard/userMessageCard";
  import mockMixin from "./mock";
  import sharebarMixin from "assets/js/sharebarMixin/index";
  import stickybits from "stickybits";
  import handleScrollMixin from './handleScrollMixin'

  export default {
    name: "group",
    mixins: [sharebarMixin, mockMixin, handleScrollMixin],
    components: {
      ...{ViewBox, XHeader, Tab, TabItem, Group, CellFormPreview},
      UserMessageCard
    },
    data: () => ({
      isOwner: false,
      tabIndex: 0,
      scrollStatus: {
        scrollTop: 0,
        lastScrollTime: 0
      },
      showHeaderInfo: false,
      stickied: false
    }),
    mounted() {
      this.initViewBoxPropertities();
      this.$nextTick(() => {
        stickybits(".list-top-box", {stickyBitStickyOffset: 47});
      });
      this.$refs.viewbox.getScrollBody().addEventListener("scroll", this.handleScroll);
      this.handleScroll({target: this.$refs.viewbox.getScrollBody()});

      this.loadData()
    },
    methods: {
      handleClickAvatar() {
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        this.$nextTick(() => {
          this.$refs.avatar.dispatchEvent(evt)
        })
      },
      modifyAvatar() {
        this.$router.push('/self/more/myinfo');
        event.stopPropagation();
      },
      loadData() {

      },
      initViewBoxPropertities() {
        let e = this.$refs.viewbox.getScrollBody();
        e.style.position = "absolute";
        e.style.left = "0";
        e.style.top = "0";
        e.style.width = "100%";
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "./group";
</style>

<style lang="scss">
  @import "../../assets/css/varies";

  #profile-XHeader {
    z-index: 1;
    padding: 3px 0 3px;
    border: none;
    #profile-XHeader-back {
      z-index: -1;
      position: absolute;
      top: -5px;
      left: 0;
      width: 100%;
      height: 52px;
      background: url("http://mzzeast.shumsg.cn/18-12-31/12524706.jpg");
      background-position-x: 0;
      background-position-y: 5px;
    }
    .vux-header-left,
    .vux-header-title,
    .vux-header-right,
    .vux-header-back {
      color: $--theme-gray-light25 !important;
    }
    .vux-header-more {
      color: $--theme-gray-light25 !important;
    }
    .vux-header-title {
      margin: 0 52px !important;
    }
  }

  .signature-cell .weui-form-preview__label {
    margin-right: 0 !important;
    text-align: left !important;
    text-align-last: left !important;
  }
</style>
