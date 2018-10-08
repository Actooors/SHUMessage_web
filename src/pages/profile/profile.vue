<template>
  <ViewBox
    ref="viewbox"
    class="profile-viewbox"
    id="__viewBox"
    body-padding-bottom="0"
  >
    <x-header slot="header"
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
      <transition name="fade" mode="out-in">
        <div
          class="headerInfo"
          v-show="showHeaderInfo"
        >
          <img src="/static/testAvatar.JPG" class="avatar">
          <div>
            <p>--正--</p>
            <p>412人关注</p>
          </div>
          <button class="follow">关注</button>
        </div>
      </transition>
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
        <p class="signature">Nice to meet you :) 多一点字啊看一看啊快过来看看</p>
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
              <tab-item selected>动态</tab-item>
              <tab-item>档案</tab-item>
            </Tab>
          </div>
        </div>
        <div class="swiper">
          <div v-show="tabIndex===0">
            <div class="moments-row">
          <span>
            <i class="icon-appreciate iconfont icon"></i>动态获得 3.5k 次赞
          </span>
            </div>
            <div class="blocks">
              <div
                v-for="block of raw"
                :key="block.value"
                class="block"
              >
                <user-message-card
                  class="moments-card"
                  v-for="item of block.cards"
                  :key="item.value"
                  :msg="item"
                  @onClickShareButton="handleClickShareButton(arguments,item)"
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
            <Group title="基本信息">
              <CellFormPreview :list="userInfo.basic"></CellFormPreview>
            </Group>
            <Group title="签名">
              <CellFormPreview
                class="signature-cell"
                :list="[{label:'Nice to meet you :) 多一点字啊看一看啊快过来看看',value:''}]"
              ></CellFormPreview>
            </Group>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, XHeader, Tab, TabItem, Group, CellFormPreview} from 'vux'
  import UserMessageCard from 'components/userMessageCard/userMessageCard'
  import mockMixin from './mock'
  import stickybits from 'stickybits'

  export default {
    name: "profile",
    components: {...{ViewBox, XHeader, Tab, TabItem, Group, CellFormPreview}, UserMessageCard},
    data: () => ({
      tabIndex: 0,
      userInfo: {
        basic: [{
          label: "性别",
          value: "女"
        }, {
          label: "星座",
          value: "巨蟹座"
        }, {
          label: "所在地",
          value: "山西 - 太原"
        }]
      },
      scrollStatus: {
        scrollTop: 0,
        lastScrollTime: 0
      },
      showHeaderInfo: false,
    }),
    mounted() {
      this.resetViewBoxPropertities()
      this.$nextTick(() => {
        stickybits(".list-top-box", {stickyBitStickyOffset: 46})
      });
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
        let now = Date.now()
        if (now - this.scrollStatus.lastScrollTime < 20) {
          return
        }
        this.scrollStatus.lastScrollTime = now
        let top = event.target.scrollTop
        let that = this
        document.getElementById('profile-XHeader').style.backgroundPositionY = `${-Math.min(top, 300 - 46)}px`;
        //超过头像的时候浮现关注。gallery的padding-top为70px；头像即toprow，高64px；headbar高46px
        const keyY = 70 + 64 - 46;
        //如果top和scrollTop分布于keyY两端，则更改showHeaderInfo的状态
        /*
        * 2018-10-08 09:57:14
        * debug手札: ios获取到的scrollTop是个整型，因此可能出现相乘为0的情况
        */
        if ((top - keyY) * (this.scrollStatus.scrollTop - keyY) <= 0) {
          let k = top - this.scrollStatus.scrollTop > 0
          // console.log(k, top - this.scrollStatus.scrollTop)
          // this.test = top - this.scrollStatus.scrollTop
          this.$nextTick(() => {
            that.showHeaderInfo = k;
          })
        }
        this.scrollStatus.scrollTop = top;
      }
    },
    mixins: [mockMixin]
  }
</script>

<style lang="scss" scoped>
  @import "./profile";
  @import "../moments/moments";
  @import "~animate.css";
</style>

<style lang="scss">
  @import "../../assets/css/varies";

  #profile-XHeader {
    background: url("https://s2.music.126.net/style/web2/img/down/bg.jpg?555a00dc3f44ed524eb92d70bbd60bc0");
    background-position-x: 0;
    z-index: 1;
    padding: 3px 0 3px;
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

  .signature-cell .weui-form-preview__label {
    margin-right: 0 !important;
    text-align: left !important;
    text-align-last: left !important;
  }
</style>
