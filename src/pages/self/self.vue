<template>
  <ViewBox class="wrapper" id="__viewBox" ref="viewBox">
    <x-header slot="header" class="self-XHeader"
              :left-options="{showBack: false}"
              :right-options="{showMore: false}"
    >SHU Message
      <div slot="left" @click="handleClickMessage" style="position: relative;">
        <i class="icon-mail iconfont icon"></i>
        <span class="badge" v-show="hasMessage"></span>
      </div>
      <div slot="right" @click="handleClickMore">
        <i class="icon-shezhi iconfont icon"></i>
      </div>
    </x-header>
    <div class="show-bar">
      <div class="center-content">
        <img :src="info.avatar" class="avatar" @click="$router.push({path:'/profile',query:{id:info.id}})">
        <p class="username">{{info.name}}</p>
        <p class="tips">{{tips}}</p>
      </div>
    </div>
    <tab
      v-model="tabIndex"
      :line-width="2"
      custom-bar-width="20px"
      bar-active-color="#2196F3"
      active-color="#2196F3"
      class="self-tab"
    >
      <tab-item selected>瞬间</tab-item>
      <tab-item>订阅</tab-item>
    </tab>
    <div v-show="tabIndex===0">
      <Timeline class="timeline">
        <timeline-item>
          <h4 class="recent">发布了一个动态</h4>
          <p class="recent">2016-04-17 12:00:00</p>
        </timeline-item>
        <timeline-item>
          <h4>订阅3个兴趣</h4>
          <p>2016-04-16 10:23:00</p>
        </timeline-item>
        <timeline-item>
          <h4>TA出生了！</h4>
          <p>2016-04-15 9:00:00</p>
        </timeline-item>
      </Timeline>
    </div>
    <div v-show="tabIndex===1">
      <CardWall>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </CardWall>
    </div>
  </ViewBox>
</template>

<script>
  import {ViewBox, Tab, TabItem, Timeline, TimelineItem, XHeader, Badge} from "vux";
  import stickybits from 'stickybits'

  export default {
    name: "self",
    components: {
      ...{Timeline, ViewBox, Tab, TabItem, TimelineItem, XHeader, Badge},
      CardWall: () => import('components/cardWall/cardWall')
    },
    data() {
      return {
        tabIndex: 0,
        tips: "29天, 3个订阅",
        hasMessage: true,
        info: {
          avatar: require('assets/images/avatar.png'),
          name: "赤膊吃西瓜",
          id: 10001,
        }
      }
    },
    mounted() {
      stickybits('.self-tab', {stickyBitStickyOffset: 46});
      const XHeader = document.querySelector(".self-XHeader");
      document.querySelector(".self-XHeader+#vux_view_box_body").addEventListener('scroll', (event) => {
        const bound = 225 - 46;
        const contain = XHeader.classList.contains("theme-XHeader");
        if (event.target.scrollTop > bound) {
          if (!contain) {
            XHeader.classList.add("theme-XHeader")
          }
        } else {
          if (contain) {
            XHeader.classList.remove("theme-XHeader")
          }
        }
      })
    },
    methods: {
      handleClickMore() {
        this.$router.push("/self/more")
      },
      handleClickMessage() {
        this.$router.push('/myMessage')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "self";
</style>

<style lang="scss">
  .theme-XHeader.self-XHeader {
    .iconfont {
      color: black !important;
    }
  }
</style>
